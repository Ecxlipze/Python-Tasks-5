"use client";

import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types/candidate";
import { Pencil } from "lucide-react";

import EditCandidateModal from "@/components/dashboard/EditCandidateModal";
import DeleteCandidateDialog from "@/components/dashboard/DeleteCandidateDialog";

interface CandidatesTableProps {
  candidates: Candidate[];
}

export default function CandidatesTable({
  candidates,
}: CandidatesTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Experience</th>
            <th className="p-4 text-left">Education</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-medium">{candidate.full_name}</td>
              <td className="p-4">{candidate.email}</td>
              <td className="p-4">{candidate.phone}</td>
              <td className="p-4">
                <Badge variant="secondary">{candidate.experience} yrs</Badge>
              </td>
              <td className="p-4">{candidate.education}</td>
              <td className="p-4">
                <div className="flex justify-center gap-3">
                  <EditCandidateModal
                    candidate={candidate}
                    trigger={<Pencil size={18} />}
                  />
                  <DeleteCandidateDialog candidate={candidate} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
