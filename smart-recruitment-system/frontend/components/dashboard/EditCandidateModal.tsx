"use client";

import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCandidate } from "@/services/candidates";
import { Candidate } from "@/types/candidate";
import {
  candidateSchema,
  type CandidateFormValues,
} from "@/lib/validations/candidate";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditCandidateModalProps {
  candidate: Candidate;
  trigger?: ReactNode;
}

export default function EditCandidateModal({
  candidate,
  trigger,
}: EditCandidateModalProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      full_name: candidate.full_name,
      email: candidate.email,
      phone: candidate.phone,
      experience: Number(candidate.experience),
      education: candidate.education,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: CandidateFormValues) =>
      updateCandidate(candidate.id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate updated successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update candidate."
      );
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      form.reset({
        full_name: candidate.full_name,
        email: candidate.email,
        phone: candidate.phone,
        experience: Number(candidate.experience),
        education: candidate.education,
      });
      form.clearErrors();
    }
  }

  function handleSubmit(values: CandidateFormValues) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
          {trigger ?? "Edit"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-1">
            <Input
              placeholder="Full Name"
              disabled={mutation.isPending}
              {...form.register("full_name")}
            />
            {form.formState.errors.full_name ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.full_name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Email"
              disabled={mutation.isPending}
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Phone"
              disabled={mutation.isPending}
              {...form.register("phone")}
            />
            {form.formState.errors.phone ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              type="number"
              step="0.1"
              placeholder="Experience"
              disabled={mutation.isPending}
              {...form.register("experience", { valueAsNumber: true })}
            />
            {form.formState.errors.experience ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.experience.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Education"
              disabled={mutation.isPending}
              {...form.register("education")}
            />
            {form.formState.errors.education ? (
              <p className="text-sm text-red-600">
                {form.formState.errors.education.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full py-3">
            {mutation.isPending ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
