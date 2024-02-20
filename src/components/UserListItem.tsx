import { IUser } from "@/types/user";
import React from "react";

interface IPropTypes {
  user: IUser;
}

export default function UserListItem(props: IPropTypes) {
  const { user } = props;
  return <div className="flex flex-row bg-green p-4">{user.id}</div>;
}
