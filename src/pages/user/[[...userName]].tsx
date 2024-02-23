import React from "react";
import { Headers, octokit } from "@/config/config";
import { ISingleUser, IUser } from "@/types/user";
import Image from "next/image";
import { headers } from "next/headers";
import Card from "@/components/Card";

interface IPropTypes {
  user: ISingleUser;
}

const cardComponentOptions = ["Location", "Followers", "Following"];

const cardUrlOptions = ["Blog", "Organizations", "Repos", "Url"];

const KEYS_WITH_URL_TEXT = ["repos", "organizations"];

export default function SingleUser(props: IPropTypes) {
  const { user } = props;

  const renderCardComponent = (options: string[]) => {
    return (
      <div className="flex flex-row gap-2">
        {options.map((option) => {
          return (
            <Card
              key={option}
              component={
                <>
                  <p className="text-sm">
                    {option === "Url" ? "Github" : option}
                  </p>
                  <p className="text-2xl text-semibold line-clamp-2 text-wrap">
                    {KEYS_WITH_URL_TEXT.includes(option.toLowerCase())
                      ? // @ts-ignore
                        user[`${option?.toLowerCase()}_url`]
                      : // @ts-ignore
                        user[option?.toLowerCase()]}
                  </p>
                </>
              }
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4 gap-3">
      <div className="flex flex-row gap-3 items-center">
        <Image
          width={48}
          height={48}
          src={user.avatar_url}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-2">
            <p className="text-sm font-semibold">{user.name}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {renderCardComponent(cardComponentOptions)}
        {renderCardComponent(cardUrlOptions)}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { userName } = context.params;
  const res = await octokit.request(`GET /users/${userName}`, {
    headers: Headers,
  });

  return { props: { user: res.data } };
};
