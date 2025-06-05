"use client";

import React, { useState, useEffect } from "react";
import { JobForm } from "../components/JobForm";
import { JobCard } from "../components/JobCard";
import { Job, JobStatus } from "@/types";
import DnDJobBoard from "../components/DnDJobBoard";
import { useJobStore } from "@/store/useJobStore";

export default function Home() {
  const { jobs, fetchJobs, addJob, deleteJob, editJob } = useJobStore();
  const [filter, setFilter] = useState<JobStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "date-desc" | "date-asc" | "company-asc" | "company-desc"
  >("date-desc");
  const [view, setView] = useState<"list" | "board">("list");
  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs
    .filter((job) => {
      const matchesStatus = filter === "all" || job.status === filter;
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return (
            new Date(a.dateApplied).getTime() -
            new Date(b.dateApplied).getTime()
          );
        case "date-desc":
          return (
            new Date(b.dateApplied).getTime() -
            new Date(a.dateApplied).getTime()
          );
        case "company-asc":
          return a.company.localeCompare(b.company);
        case "company-desc":
          return b.company.localeCompare(a.company);
        default:
          return 0;
      }
    });

  return (
    <main className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Job Hunt Tracker</h1>
      <div className='mb-4'>
        <button
          onClick={() => setView(view === "list" ? "board" : "list")}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Switch to {view === "list" ? "Board View" : "List View"}
        </button>
      </div>

      <section className='mb-6'>
        <JobForm onAdd={addJob} />
      </section>

      <section className='mb-6 flex flex-col sm:flex-row gap-4 sm:items-center'>
        <div>
          <label htmlFor='statusFilter' className='mr-2 font-medium'>
            Filter by Status:
          </label>
          <select
            id='statusFilter'
            value={filter}
            onChange={(e) => setFilter(e.target.value as JobStatus)}
            className='border rounded p-2'
          >
            <option value='all'>All</option>
            <option value='applied'>Applied</option>
            <option value='interviewing'>Interviewing</option>
            <option value='offer'>Offer</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor='search' className='mr-2 font-medium'>
            Search:
          </label>
          <input
            id='search'
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border rounded p-2'
            placeholder='Company or Position'
          />
        </div>
      </section>
      <div>
        <label htmlFor='sortBy' className='mr-2 font-medium'>
          Sort by:
        </label>
        <select
          id='sortBy'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className='border rounded p-2'
        >
          <option value='date-desc'>Date (Newest First)</option>
          <option value='date-asc'>Date (Oldest First)</option>
          <option value='company-asc'>Company (A-Z)</option>
          <option value='company-desc'>Company (Z-A)</option>
        </select>
      </div>

      {view === "list" ? (
        <section>
          {filteredJobs.length === 0 ? (
            <p className='text-gray-500'>No jobs found for this status.</p>
          ) : (
            <div className='grid gap-4'>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onDelete={() => deleteJob(job.id)}
                  onEdit={(updatedJob) => editJob(job.id, updatedJob)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <DnDJobBoard
          jobs={jobs}
          setJobs={addJob}
          onEdit={editJob}
          onDelete={deleteJob}
        />
      )}
    </main>
  );
}
