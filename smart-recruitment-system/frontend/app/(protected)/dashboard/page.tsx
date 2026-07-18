"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Brain, FileText, Users } from "lucide-react";

import { getJobs } from "@/services/jobs";
import { getCandidates } from "@/services/candidates";
import { getResumes } from "@/services/resumes";
import { getAnalysis } from "@/services/analysis";

import Loading from "@/components/dashboard/Loading";
import EmptyState from "@/components/dashboard/EmptyState";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const previewCount = 3;

export default function DashboardPage() {
  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ["jobs", "dashboard"],
    queryFn: () => getJobs({ page_size: 10 }),
  });

  const { data: candidatesData, isLoading: candidatesLoading } = useQuery({
    queryKey: ["candidates", "dashboard"],
    queryFn: () => getCandidates({ page_size: 10 }),
  });

  const { data: resumesData, isLoading: resumesLoading } = useQuery({
    queryKey: ["resumes", "dashboard"],
    queryFn: () => getResumes({ page_size: 10 }),
  });

  const { data: analysesData, isLoading: analysesLoading } = useQuery({
    queryKey: ["analysis", "dashboard"],
    queryFn: () => getAnalysis({ page_size: 10 }),
  });

  if (jobsLoading || candidatesLoading || resumesLoading || analysesLoading) {
    return <Loading />;
  }

  const jobs = jobsData?.results ?? [];
  const candidates = candidatesData?.results ?? [];
  const resumes = resumesData?.results ?? [];
  const analyses = analysesData?.results ?? [];

  const stats = [
    {
      title: "Total Jobs",
      value: jobsData?.count ?? 0,
      icon: Briefcase,
      href: "/jobs",
    },
    {
      title: "Candidates",
      value: candidatesData?.count ?? 0,
      icon: Users,
      href: "/candidates",
    },
    {
      title: "Resumes",
      value: resumesData?.count ?? 0,
      icon: FileText,
      href: "/resumes",
    },
    {
      title: "AI Analyses",
      value: analysesData?.count ?? 0,
      icon: Brain,
      href: "/analysis",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
          RecruitAI Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          Welcome back, Rohan 👋
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Track your hiring pipeline, review recent activity, and jump into the
          next action faster.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/jobs">+ New Job</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/analysis">Run Analysis</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardDescription>{stat.title}</CardDescription>
                      <CardTitle className="mt-2 text-3xl">
                        {stat.value}
                      </CardTitle>
                    </div>
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                      <Icon size={20} />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Latest openings created in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobs.length > 0 ? (
              jobs.slice(0, previewCount).map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company}
                    </p>
                  </div>
                  <Badge variant="secondary">{job.location}</Badge>
                </div>
              ))
            ) : (
              <EmptyState title="No jobs yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
            <CardDescription>Newest candidate profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidates.length > 0 ? (
              candidates.slice(0, previewCount).map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{candidate.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {candidate.email}
                    </p>
                  </div>
                  <Badge variant="outline">{candidate.education}</Badge>
                </div>
              ))
            ) : (
              <EmptyState title="No candidates yet." />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Resume Uploads</CardTitle>
            <CardDescription>Latest files received</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {resumes.length > 0 ? (
              resumes.slice(0, previewCount).map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{resume.candidate_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {resume.job_title}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {new Date(resume.uploaded_at).toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <EmptyState title="No resumes uploaded." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent AI Analyses</CardTitle>
            <CardDescription>Latest scoring results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {analyses.length > 0 ? (
              analyses.slice(0, previewCount).map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{analysis.candidate_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {analysis.job_title}
                    </p>
                  </div>
                  <Badge variant="secondary">{analysis.match_score}%</Badge>
                </div>
              ))
            ) : (
              <EmptyState title="No analyses yet." />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
