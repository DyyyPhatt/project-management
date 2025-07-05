import { Project } from "@/state/api";
import React from "react";
import { format } from "date-fns";
import { CalendarDays, FileText, FolderKanban } from "lucide-react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  const formattedStartDate = project.startDate
    ? format(new Date(project.startDate), "PPP")
    : "N/A";

  const formattedEndDate = project.endDate
    ? format(new Date(project.endDate), "PPP")
    : "N/A";

  return (
    <div className="group dark:border-stroke-dark dark:bg-dark-secondary relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl dark:text-white">
      <div className="mb-4 flex items-center gap-3">
        <FolderKanban className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-semibold">{project.name}</h3>
      </div>

      <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
        {project.description || "No description provided."}
      </p>

      <div className="grid grid-cols-1 gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span className="font-medium">Start:</span>
          <span>{formattedStartDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span className="font-medium">End:</span>
          <span>{formattedEndDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="font-medium">Tasks:</span>
          <span className="text-gray-400 italic dark:text-gray-500">
            Not shown
          </span>
        </div>
      </div>

      <div className="absolute top-0 right-0 -mt-3 -mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
        📁
      </div>
    </div>
  );
};

export default ProjectCard;
