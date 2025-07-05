import Header from "@/components/Header";
import React from "react";
import { User2, Mail, Users, ShieldCheck } from "lucide-react"; // Nếu dùng icon

const Settings = () => {
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const labelStyles =
    "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200";
  const valueStyles =
    "mt-1 w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-sm text-gray-800 dark:border-gray-600 dark:bg-dark-secondary dark:text-white";

  return (
    <div className="p-6 sm:p-8">
      <Header name="Settings" />
      <div className="dark:border-stroke-dark dark:bg-dark-secondary mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelStyles}>
              <User2 className="h-4 w-4 text-blue-500" /> Username
            </label>
            <div className={valueStyles}>{userSettings.username}</div>
          </div>

          <div>
            <label className={labelStyles}>
              <Mail className="h-4 w-4 text-green-500" /> Email
            </label>
            <div className={valueStyles}>{userSettings.email}</div>
          </div>

          <div>
            <label className={labelStyles}>
              <Users className="h-4 w-4 text-purple-500" /> Team
            </label>
            <div className={valueStyles}>{userSettings.teamName}</div>
          </div>

          <div>
            <label className={labelStyles}>
              <ShieldCheck className="h-4 w-4 text-yellow-500" /> Role
            </label>
            <div className={valueStyles}>{userSettings.roleName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
