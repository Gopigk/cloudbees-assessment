import { Octokit } from "octokit";
import { IUser } from "@/types/user";
import UserListItem from "@/components/UserListItem";
import React, { useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import { Headers, octokit } from "@/config/config";

interface IPropTypes {
  users: IUser[];
}

export default function Home({ users }: IPropTypes) {
  const [usersData, setUsersData] = useState<IUser[]>(users);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const pageRef = useRef(1);

  const fetchUsersData = async () => {
    const res = await octokit.request(
      `GET /users?per_page=60&page=${pageRef.current + 1}`,
      {
        headers: Headers,
      }
    );

    if (res.data.length === 0) setCanFetchMore(false);

    setUsersData((prev) => prev.concat(res.data as IUser[]));
  };

  const renderUser = (user: IUser) => {
    return <UserListItem user={user} />;
  };

  return (
    <div className="flex flex-col p-4">
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
            {({
              index,
              style,
              data,
            }: {
              index: number;
              style: any;
              data: IUser[];
            }) => {
              if (index >= data.length) {
                return (
                  <div
                    style={style}
                    className="flex justify-center items-center"
                  ></div>
                );
              }
              return renderUser(data[index]);
            }}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  );
}

export const getServerSideProps = async () => {
  // const res = { data: [] };
  const res = await octokit.request("GET /users?per_page=60&page=1", {
    headers: Headers,
  });

  return { props: { users: res.data } };
};
