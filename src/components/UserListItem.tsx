import { IUser } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPropTypes {
  user: IUser;
}

export default function UserListItem(props: IPropTypes) {
  const { user } = props;

  if (!user?.login) return null;

  const firstName = user?.login?.split(" ")[0];
  const lastName = user?.login?.split(" ")[1];
  return (
    <Link href={`/user/${user?.login}`} className="flex flex-row w-full p-4">
      <Image
        width={48}
        height={48}
        src={user?.avatar_url}
        alt="avatar"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex flex-col ml-4">
        <div className="flex flex-row gap-2 items-center">
          <p className="text-md">FirstName:</p>
          <p className="text-md font-semibold">{firstName}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-md">LastName:</p>
          <p className="text-md font-semibold">{lastName || "NA"}</p>
        </div>
      </div>
    </Link>
  );
}
