"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { toast } from "sonner";

import { getCandidates } from "@/services/candidates";
import { getJobs } from "@/services/jobs";
import { uploadResume } from "@/services/resumes";
import { LIST_PAGE_SIZE } from "@/constants/pagination";

import { Button } from "@/components/ui/button";

export default function UploadResumeCard() {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [jobId, setJobId] = useState("");

  const { data: candidatesData } = useQuery({
    queryKey: ["candidates", "upload-options"],
    queryFn: () => getCandidates({ page_size: LIST_PAGE_SIZE }),
  });

  const { data: jobsData } = useQuery({
    queryKey: ["jobs", "upload-options"],
    queryFn: () => getJobs({ page_size: LIST_PAGE_SIZE }),
  });

  const mutation = useMutation({
    mutationFn: uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume uploaded successfully");
      setSelectedFileName("");
      setCandidateId("");
      setJobId("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload resume."
      );
    },
  });

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      event.target.value = "";
      setSelectedFileName("");
      return;
    }

    setSelectedFileName(file.name);
  }

  function handleUpload() {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      toast.error("Choose a PDF file first.");
      return;
    }

    if (!candidateId || !jobId) {
      toast.error("Select a candidate and job first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume_file", file);
    formData.append("candidate", candidateId);
    formData.append("job", jobId);

    mutation.mutate(formData);
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold">Upload Resume</h2>
          <p className="text-sm text-muted-foreground">
            Upload a PDF to save the resume and extract text automatically.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <select
            value={candidateId}
            onChange={(event) => setCandidateId(event.target.value)}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Select candidate</option>
            {(candidatesData?.results ?? []).map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.full_name}
              </option>
            ))}
          </select>

          <select
            value={jobId}
            onChange={(event) => setJobId(event.target.value)}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Select job</option>
            {(jobsData?.results ?? []).map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>

          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="text-sm"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {selectedFileName ? `Selected: ${selectedFileName}` : "No file selected"}
          </p>

          <Button
            type="button"
            onClick={handleUpload}
            disabled={mutation.isPending}
          >
            <Upload className="mr-2 size-4" />
            {mutation.isPending ? "Uploading..." : "Upload PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}
