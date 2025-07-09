"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="p-6 sm:p-8">
      <Header name="Search" />

      <div className="dark:bg-dark-secondary mt-6 flex w-full max-w-md items-center rounded-md border border-gray-300 bg-white p-2 shadow-sm dark:border-gray-600">
        <SearchIcon className="ml-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search for tasks, projects, or users..."
          className="ml-2 w-full bg-transparent p-2 text-sm outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
          onChange={handleSearch}
        />
      </div>

      <div className="mt-8 space-y-8">
        {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        {isError && (
          <p className="text-sm text-red-500">
            Error occurred while fetching search results.
          </p>
        )}

        {!isLoading && !isError && searchResults && (
          <div className="space-y-10">
            {Array.isArray(searchResults.tasks) &&
              searchResults.tasks.length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-white">
                    Tasks
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </section>
              )}

            {Array.isArray(searchResults.projects) &&
              searchResults.projects.length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-white">
                    Projects
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </section>
              )}

            {Array.isArray(searchResults.users) &&
              searchResults.users.length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-white">
                    Users
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.users.map((user) => (
                      <UserCard key={user.userId} user={user} />
                    ))}
                  </div>
                </section>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
