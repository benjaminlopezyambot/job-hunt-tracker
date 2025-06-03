"use client";

import React, { useState } from "react";

type Props = {
  onAdd: (job: {
    company: string;
    position: string;
    status: string;
    dateApplied: string;
  }) => void;
};

export const JobForm: React.FC<Props> = ({ onAdd }) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateApplied = new Date().toISOString().split("T")[0];
    onAdd({ company, position, status, dateApplied });
    setCompany("");
    setPosition("");
    setStatus("applied");
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input
        type='text'
        placeholder='Company'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className='border p-2 w-full rounded'
        required
      />
      <input
        type='text'
        placeholder='Position'
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className='border p-2 w-full rounded'
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className='border p-2 w-full rounded'
      >
        <option value='applied'>Applied</option>
        <option value='interviewing'>Interviewing</option>
        <option value='offer'>Offer</option>
        <option value='rejected'>Rejected</option>
      </select>
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Add Job
      </button>
    </form>
  );
};
