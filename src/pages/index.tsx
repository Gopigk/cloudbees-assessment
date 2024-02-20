import { Inter } from "next/font/google";
import { Octokit } from "octokit";
import { IUser } from "@/types/user";
import UserListItem from "@/components/UserListItem";
import React, { useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";

const inter = Inter({ subsets: ["latin"] });

interface IPropTypes {
  users: IUser[];
}

const octokit = new Octokit({
  auth: "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",
});

export default function Home({ users }: IPropTypes) {
  const [usersData, setUsersData] = useState<IUser[]>(users);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const pageRef = useRef(1);

  const fetchUsersData = async () => {
    const res = await octokit.request("GET /users", {
      headers: {
        owner: "octocat",
        repo: "Spoon-Knife",
        "X-GitHub-Api-Version": "2022-11-28",
        per_page: "100",
        page: pageRef.current++,
      },
    });

    if (res.data.length === 0) setCanFetchMore(false);

    console.log(res);
    // setUsersData((prev) => prev.concat(res.data as IUser[]));
  };

  const renderUser = (user: IUser) => {
    return <UserListItem user={user} />;
  };

  return (
    <>
      <InfiniteLoader
        isItemLoaded={(index: number) => {
          return !canFetchMore || index < users.length;
        }}
        itemCount={users.length + 1}
        loadMoreItems={() => {
          if (canFetchMore) fetchUsersData();
        }}
        minimumBatchSize={30}
      >
        {({ onItemsRendered, ref }: { onItemsRendered: any; ref: any }) => (
          <FixedSizeList
            ref={ref}
            itemData={usersData}
            itemSize={38}
            itemCount={usersData.length + 1}
            height={1000}
            width={"100%"}
            onItemsRendered={onItemsRendered}
            overscanCount={30}
          >
            {({ index, style, data }) => {
              if (index >= data.length) {
                return (
                  <div
                    style={style}
                    className="flex justify-center items-center"
                  >
                    Loading...
                  </div>
                );
              }
              return renderUser(data[index]);
            }}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await octokit.request("GET /users", {
    since: 124,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      "X-Ratelimit-Limit": 15000,
      "X-Ratelimit-Remaining": 14996,
    },
  });

  console.log(res);
  return { props: { users: res.data } };
};
