import { IUser } from "@/types/user";
import UserListItem from "@/components/UserListItem";
import React, { useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import { BASE_URL, Headers } from "@/config/config";
import axios from "axios";

interface IPropTypes {
  users: IUser[];
}

const PER_PAGE_COUNT = 60;

export default function Home({ users }: IPropTypes) {
  const [usersData, setUsersData] = useState<IUser[]>(users);
  const [loading, setLoading] = useState(false);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const pageRef = useRef(1);

  const fetchUsersData = async () => {
    if (pageRef.current > 2) return setLoading(false);
    setLoading(true);
    return axios
      .get(
        `${BASE_URL}/users?per_page=${PER_PAGE_COUNT}&page=${pageRef.current}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.length < PER_PAGE_COUNT) setCanFetchMore(false);

        setUsersData((prev) => [...prev, ...response.data]);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const renderUser = (user: IUser) => {
    return <UserListItem user={user} />;
  };

  if (!usersData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col p-4">
      <InfiniteLoader
        isItemLoaded={(index: number) => {
          return !canFetchMore || index < users.length;
        }}
        itemCount={users.length + 1}
        loadMoreItems={() => {
          if (canFetchMore && !loading) {
            pageRef.current += 1;
            fetchUsersData();
          }
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
              if (index >= data.length && loading) {
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
    </div>
  );
}

export const getServerSideProps = async () => {
  const res: IUser[] = [];
  await axios
    .get(`${BASE_URL}/users`, {
      params: { per_page: PER_PAGE_COUNT, page: 1 },
    })
    .then((response) => {
      res.push(response.data);
    })
    .catch((err) => console.error(err));
  console.log(res);
  return { props: { users: res } };
};
