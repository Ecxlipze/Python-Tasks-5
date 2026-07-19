"use client";

import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateJob } from "@/services/jobs";
import { getApiErrorMessage } from "@/lib/api-error";
import { Job } from "@/types/job";
import { jobSchema, type JobFormValues } from "@/lib/validations/job";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditJobModalProps {
  job: Job;
  trigger?: ReactNode;
}

export default function EditJobModal({
  job,
  trigger,
}: EditJobModalProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: JobFormValues) =>
      updateJob(job.id, {
        ...values,
        required_skills: job.required_skills ?? [],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job updated successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update job."));
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      form.reset({
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
      });
      form.clearErrors();
    }
  }

  function handleSubmit(values: JobFormValues) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="text-blue-600 hover:text-blue-800"
        >
          {trigger ?? "Edit"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-1">
            <Input
              placeholder="Job Title"
              disabled={mutation.isPending}
              {...form.register("title")}
            />
            {form.formState.errors.title ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Company"
              disabled={mutation.isPending}
              {...form.register("company")}
            />
            {form.formState.errors.company ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.company.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Location"
              disabled={mutation.isPending}
              {...form.register("location")}
            />
            {form.formState.errors.location ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.location.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Textarea
              rows={5}
              placeholder="Description"
              disabled={mutation.isPending}
              {...form.register("description")}
            />
            {form.formState.errors.description ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3"
          >
            {mutation.isPending ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
