"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createJob } from "@/services/jobs";
import { getApiErrorMessage } from "@/lib/api-error";
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

export default function CreateJobModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job created successfully");
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to create job."));
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
      form.clearErrors();
    }
  }

  function handleSubmit(values: JobFormValues) {
    mutation.mutate({
      ...values,
      required_skills: [],
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-lg px-5 py-2">+ New Job</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Job</DialogTitle>
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
            {mutation.isPending ? "Creating..." : "Create Job"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
