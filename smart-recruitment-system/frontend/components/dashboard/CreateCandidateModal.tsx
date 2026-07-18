"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCandidate } from "@/services/candidates";
import { getApiErrorMessage } from "@/lib/api-error";
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

export default function CreateCandidateModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      experience: 0,
      education: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      toast.success("Candidate created successfully");
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Failed to create candidate.")
      );
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      form.reset();
      form.clearErrors();
    }
  }

  function handleSubmit(values: CandidateFormValues) {
    mutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-lg px-5 py-2">+ New Candidate</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Candidate</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          {[
            ["full_name", "Full Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["education", "Education"],
          ].map(([name, placeholder]) => (
            <div key={name} className="space-y-1">
              <Input
                placeholder={placeholder}
                disabled={mutation.isPending}
                {...form.register(name as keyof CandidateFormValues)}
              />
              {form.formState.errors[name as keyof CandidateFormValues] ? (
                <p className="text-sm text-red-600">
                  {form.formState.errors[name as keyof CandidateFormValues]?.message}
                </p>
              ) : null}
            </div>
          ))}

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

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-3"
          >
            {mutation.isPending ? "Creating..." : "Create Candidate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
