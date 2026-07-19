"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getJobs } from "@/services/jobs";

import JobsTable from "@/components/dashboard/JobsTable";
import Loading from "@/components/dashboard/Loading";
import EmptyState from "@/components/dashboard/EmptyState";
import PageHeader from "@/components/dashboard/PageHeader";
import SearchBar from "@/components/dashboard/SearchBar";
import CreateJobModal from "@/components/dashboard/CreateJobModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 10;

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs", page, search],
    queryFn: () =>
      getJobs({
        page,
        page_size: PAGE_SIZE,
        search: search.trim() || undefined,
      }),
  });

  const pageCount = Math.max(
    1,
    Math.ceil((data?.count ?? 0) / PAGE_SIZE)
  );

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

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <EmptyState
        title="Unable to load jobs."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  const jobs = data?.results ?? [];

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        description="Manage all job openings"
        buttonText={<CreateJobModal />}
      />

      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="Search jobs..."
      />

      {jobs.length === 0 ? (
        <EmptyState title="No jobs found." />
      ) : (
        <>
          <JobsTable jobs={jobs} />

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
                      previousPage !== undefined &&
                      pageNumber - previousPage > 1;

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
