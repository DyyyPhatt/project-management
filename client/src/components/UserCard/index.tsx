import { User } from "@/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="dark:border-stroke-dark dark:bg-dark-secondary flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:text-white">
      {user.profilePictureUrl && (
        <Image
          src={`https://pm-s3-images-ws.s3.ap-southeast-1.amazonaws.com/${user.profilePictureUrl}`}
          alt="Profile Picture"
          width={48}
          height={48}
          className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover dark:border-gray-600"
        />
      )}
      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
          {user.username}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
