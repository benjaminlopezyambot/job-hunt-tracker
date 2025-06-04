"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import { Job, JobStatus } from "@/types";
import { JobCard } from "./JobCard";

const columns: JobStatus[] = ["applied", "interviewing", "offer", "rejected"];

type Props = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  onEdit: (id: string, updatedJob: Omit<Job, "id">) => void;
  onDelete: (id: string) => void;
};

export default function DnDJobBoard({
  jobs,
  setJobs,
  onEdit,
  onDelete,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const activeJob = jobs.find((job) => job.id === activeId) || null;

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !over.data?.current) return;

    const sourceId = active.id;
    const targetColumn = over.data.current.column;

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === sourceId ? { ...job, status: targetColumn } : job
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-6'>
        {columns.map((status) => (
          <Column
            key={status}
            status={status}
            jobs={jobs}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? (
          <div className='z-50 relative pointer-events-none'>
            <JobCard {...activeJob} onEdit={() => {}} onDelete={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function Column({
  status,
  jobs,
  onEdit,
  onDelete,
}: {
  status: JobStatus;
  jobs: Job[];
  onEdit: (id: string, updatedJob: Omit<Job, "id">) => void;
  onDelete: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      column: status,
    },
  });

  const columnJobs = jobs.filter((job) => job.status === status);

  return (
    <div
      ref={setNodeRef}
      className='bg-gray-100 p-4 rounded shadow relative min-h-[200px]'
    >
      <h2 className='text-lg font-semibold capitalize mb-4'>{status}</h2>

      <SortableContext
        items={columnJobs.map((job) => job.id)}
        strategy={rectSortingStrategy}
      >
        <div className='space-y-4'>
          {columnJobs.map((job) => (
            <SortableJobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
              column={status}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableJobCard({
  job,
  onEdit,
  onDelete,
  column,
}: {
  job: Job;
  onEdit: (id: string, updatedJob: Omit<Job, "id">) => void;
  onDelete: (id: string) => void;
  column: JobStatus;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: job.id,
      data: {
        column,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 10,
    position: "relative" as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <JobCard
        {...job}
        onEdit={(j) => onEdit(job.id, j)}
        onDelete={() => onDelete(job.id)}
      />
    </div>
  );
}
