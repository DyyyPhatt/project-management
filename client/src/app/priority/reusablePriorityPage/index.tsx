"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import TaskCard from "@/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 100 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState<"list" | "table">("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter((task) => {
    if (!task.priority) return false;
    const p = task.priority.trim().toLowerCase();
    const target = priority.trim().toLowerCase();
    return p === target;
  });

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            + Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`rounded-l px-4 py-2 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded-r px-4 py-2 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          }`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : filteredTasks && filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-gray-500">
          {/* SVG minh họa "No results found" */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-6 h-24 w-24 text-gray-300"
            fill="none"
            viewBox="0 0 64 64"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle
              cx="27"
              cy="27"
              r="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="41"
              y1="41"
              x2="56"
              y2="56"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="19"
              y1="19"
              x2="35"
              y2="35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="35"
              y1="19"
              x2="19"
              y2="35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="mb-2 text-lg font-semibold">No tasks found</p>
          <p className="max-w-xs text-sm text-gray-400">
            There are no tasks with the priority{" "}
            <span className="font-medium">{priority}</span> at the moment.
          </p>
        </div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        filteredTasks && (
          <div className="z-0 w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
