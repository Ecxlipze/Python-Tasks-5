"use client";

import { Job } from "@/types/job";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EditJobModal from "@/components/dashboard/EditJobModal";
import DeleteJobDialog from "@/components/dashboard/DeleteJobDialog";

interface JobsTableProps {
  jobs: Job[];
}

export default function JobsTable({
  jobs,
}: JobsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Skills</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {job.title}
              </td>

              <td className="p-4">
                {job.company}
              </td>

              <td className="p-4">
                {job.location}
              </td>

              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {job.required_skills.length > 0 ? (
                    job.required_skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No skills listed
                    </span>
                  )}
                </div>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-3">
                  <EditJobModal
                    job={job}
                    trigger={<Pencil size={18} />}
                  />

                  <DeleteJobDialog job={job} />
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
