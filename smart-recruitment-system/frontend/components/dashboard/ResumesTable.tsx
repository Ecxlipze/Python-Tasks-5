"use client";

import { Resume } from "@/types/resume";

interface ResumesTableProps {
  resumes: Resume[];
}

export default function ResumesTable({ resumes }: ResumesTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Candidate</th>
            <th className="p-4 text-left">Job</th>
            <th className="p-4 text-left">Uploaded At</th>
            <th className="p-4 text-left">File</th>
          </tr>
        </thead>

        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{resume.candidate_name}</td>
              <td className="p-4">{resume.job_title}</td>
              <td className="p-4 text-sm text-muted-foreground">
                {new Date(resume.uploaded_at).toLocaleString()}
              </td>
              <td className="p-4">
                <a
                  href={resume.resume_file}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
