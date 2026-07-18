"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getAnalysis, createAnalysis } from "@/services/analysis";
import { getResumes } from "@/services/resumes";

import Loading from "@/components/dashboard/Loading";
import EmptyState from "@/components/dashboard/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 10;

export default function AnalysisPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [candidateId, setCandidateId] = useState("");
  const [jobId, setJobId] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["analysis", page, search],
    queryFn: () =>
      getAnalysis({
        page,
        page_size: PAGE_SIZE,
        search: search.trim() || undefined,
      }),
  });

  const { data: resumesData } = useQuery({
    queryKey: ["resumes", "analysis-options"],
    queryFn: () => getResumes({ page_size: 100 }),
  });

  const mutation = useMutation({
    mutationFn: createAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analysis"] });
      toast.success("Analysis completed successfully");
      setCandidateId("");
      setJobId("");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to run analysis."
      );
    },
  });

  const pageCount = Math.max(1, Math.ceil((data?.count ?? 0) / PAGE_SIZE));

  const analyses = useMemo(() => data?.results ?? [], [data]);
  const resumes = useMemo(() => resumesData?.results ?? [], [resumesData]);

  const visiblePages = useMemo(() => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const start = Math.max(1, page - 1);
    const end = Math.min(pageCount, start + 2);
    const pages = new Set<number>([1, pageCount]);

    for (let current = start; current <= end; current += 1) {
      pages.add(current);
    }

    return Array.from(pages).sort((a, b) => a - b);
  }, [page, pageCount]);

  const candidateOptions = useMemo(() => {
    const candidateMap = new Map<number, string>();

    for (const resume of resumes) {
      candidateMap.set(resume.candidate, resume.candidate_name);
    }

    return Array.from(candidateMap.entries()).map(([id, label]) => ({
      id,
      label,
    }));
  }, [resumes]);

  const jobOptions = useMemo(() => {
    const relevantResumes = candidateId
      ? resumes.filter((resume) => resume.candidate === Number(candidateId))
      : resumes;

    const jobMap = new Map<number, string>();

    for (const resume of relevantResumes) {
      jobMap.set(resume.job, resume.job_title);
    }

    return Array.from(jobMap.entries()).map(([id, label]) => ({
      id,
      label,
    }));
  }, [candidateId, resumes]);

  const selectedPairExists = useMemo(() => {
    if (!candidateId || !jobId) {
      return false;
    }

    return resumes.some(
      (resume) =>
        resume.candidate === Number(candidateId) &&
        resume.job === Number(jobId)
    );
  }, [candidateId, jobId, resumes]);

  if (isLoading) return <Loading />;

  if (isError) {
    return <EmptyState title="Failed to load analyses." />;
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleCandidateChange(value: string) {
    setCandidateId(value);
    setJobId("");
  }

  function handleAnalyze() {
    if (!candidateId || !jobId) {
      toast.error("Select a candidate and job first.");
      return;
    }

    if (!selectedPairExists) {
      toast.error("No uploaded resume exists for this candidate/job pair.");
      return;
    }

    mutation.mutate({
      candidate: Number(candidateId),
      job: Number(jobId),
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Analysis"
        description="Analyze candidate resumes against a job"
      />

      <div className="rounded-xl border bg-white p-4 shadow">
        <div className="grid gap-3 lg:grid-cols-3">
          <select
            value={candidateId}
            onChange={(event) => handleCandidateChange(event.target.value)}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Select candidate</option>
            {candidateOptions.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.label}
              </option>
            ))}
          </select>

          <select
            value={jobId}
            onChange={(event) => setJobId(event.target.value)}
            disabled={!candidateId}
            className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Select job</option>
            {jobOptions.map((job) => (
              <option key={job.id} value={job.id}>
                {job.label}
              </option>
            ))}
          </select>

          <Button
            type="button"
            onClick={handleAnalyze}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>

      <SearchBar value={search} onChange={handleSearchChange} />

      {analyses.length === 0 ? (
        <EmptyState title="No analyses found." />
      ) : (
        <>
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="rounded-xl border bg-white p-4 shadow"
              >
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {analysis.candidate_name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {analysis.job_title}
                    </p>
                  </div>

                  <Badge variant="secondary">
                    Match Score: {analysis.match_score}%
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">
                      Extracted Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.extracted_skills.length > 0 ? (
                        analysis.extracted_skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No skills extracted
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">
                      Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missing_skills.length > 0 ? (
                        analysis.missing_skills.map((skill) => (
                          <Badge key={skill} variant="destructive">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          None
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium">
                      Recommendations
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {analysis.recommendations.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pageCount > 1 ? (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.max(1, current - 1));
                      }}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {visiblePages.map((pageNumber, index) => {
                    const previousPage = visiblePages[index - 1];
                    const showEllipsis =
                      previousPage !== undefined && pageNumber - previousPage > 1;

                    return (
                      <PaginationItem key={pageNumber}>
                        {showEllipsis ? (
                          <span className="px-2 text-muted-foreground">...</span>
                        ) : null}

                        <PaginationLink
                          href="#"
                          isActive={pageNumber === page}
                          onClick={(event) => {
                            event.preventDefault();
                            setPage(pageNumber);
                          }}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.min(pageCount, current + 1));
                      }}
                      className={page === pageCount ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
