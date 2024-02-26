import { IUser } from "@/types/user";
import UserListItem from "@/components/UserListItem";
import React, { useRef, useState } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";
import { BASE_URL } from "@/config/config";
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

  const renderRow = ({ index, style }: { index: number; style: any }) => {
    return (
      <div style={style} key={index}>
        {index >= usersData.length && loading && canFetchMore ? (
          <p>Loading...</p>
        ) : (
          renderUser(usersData[index])
        )}
      </div>
    );
  };

  if (!usersData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
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
        minimumBatchSize={60}
      >
        {({ onItemsRendered, ref }: { onItemsRendered: any; ref: any }) => (
          <FixedSizeList
            ref={ref}
            itemData={usersData}
            itemSize={70}
            itemCount={usersData.length + 1}
            height={800}
            width={"100%"}
            onItemsRendered={onItemsRendered}
            overscanCount={30}
          >
            {renderRow}
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
