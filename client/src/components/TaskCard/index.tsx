import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { Calendar, User, Tag, Flag, ClipboardList, Trash2 } from "lucide-react";

type Props = {
  task: Task;
  onDeleted?: (taskId: number) => void;
};

const TaskCard = ({ task, onDeleted }: Props) => {
  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "Not set";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "Not set";

  const priorityStyles: Record<string, string> = {
    Urgent: "bg-red-100 text-red-700",
    High: "bg-yellow-100 text-yellow-700",
    Medium: "bg-green-100 text-green-700",
    Low: "bg-blue-100 text-blue-700",
    default: "bg-gray-100 text-gray-700",
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Task deleted successfully.");
        if (onDeleted) onDeleted(task.id);
        location.reload();
      } else {
        alert("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="dark:bg-dark-secondary relative rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg dark:text-white">
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-600 dark:hover:text-red-500"
        title="Delete Task"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      {/* Image */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4 overflow-hidden rounded-lg border">
          <Image
            src={`https://pm-s3-images-ws.s3.ap-southeast-1.amazonaws.com/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={600}
            height={300}
            className="h-48 w-full object-cover"
          />
        </div>
      )}

      {/* Title + Description */}
      <h3 className="mb-2 text-xl font-semibold tracking-tight">
        {task.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {task.description || "No description provided"}
      </p>

      <hr className="mb-4 border-gray-200 dark:border-neutral-700" />

      {/* Meta Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-800 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <ClipboardList size={16} />
          <span className="font-medium">Status:</span>
          <span className="ml-auto inline-block rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-neutral-800">
            {task.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Flag size={16} />
          <span className="font-medium">Priority:</span>
          <span
            className={`ml-auto inline-block rounded px-2 py-0.5 text-xs ${
              priorityStyles[task.priority || "default"]
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Tag size={16} />
          <span className="font-medium">Tags:</span>
          <span className="ml-auto text-xs">
            {task.tags ? task.tags : "No tags"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ClipboardList size={16} />
          <span className="font-medium">Points:</span>
          <span className="ml-auto text-xs">
            {typeof task.points === "number" ? task.points : "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="font-medium">Start Date:</span>
          <span className="ml-auto text-xs">{formattedStartDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="font-medium">Due Date:</span>
          <span className="ml-auto text-xs">{formattedDueDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} />
          <span className="font-medium">Author:</span>
          <span className="ml-auto text-xs">
            {task.author ? task.author.username : "Unknown"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} />
          <span className="font-medium">Assignee:</span>
          <span className="ml-auto text-xs">
            {task.assignee ? task.assignee.username : "Unassigned"}
          </span>
        </div>
      </div>

      {/* Avatars */}
      <div className="mt-5 flex items-center gap-3">
        {task.author && (
          <div className="flex items-center gap-2">
            <Image
              src={`https://pm-s3-images-ws.s3.ap-southeast-1.amazonaws.com/${task.author.profilePictureUrl!}`}
              alt={task.author.username}
              width={32}
              height={32}
              className="dark:border-dark-secondary h-8 w-8 rounded-full border border-white object-cover"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {task.author.username}
            </span>
          </div>
        )}
        {task.assignee && (
          <div className="flex items-center gap-2">
            <Image
              src={`https://pm-s3-images-ws.s3.ap-southeast-1.amazonaws.com/${task.assignee.profilePictureUrl!}`}
              alt={task.assignee.username}
              width={32}
              height={32}
              className="dark:border-dark-secondary h-8 w-8 rounded-full border border-white object-cover"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {task.assignee.username}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
