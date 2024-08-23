import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import io from "socket.io-client";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import useTempStore, { useCacheAdd } from "./tempStore";

const socket = io("http://localhost:5000"); // Backend server URL

const fetchUsers = async ({ pageParam = undefined }) => {
  const { data } = await axios.get("http://localhost:5000/api/users2", {
    params: { index: pageParam },
  });
  return data;
};

const Member = ({ user }) => {
  const addNewly = useCacheAdd((state) => state?.[user.id]);

  if (addNewly) return null;
  return (
    <div key={user.id}>
      <h4>{user.id}</h4>
      <p>{user.username}</p>
      <p>Age: {user.age}</p>
      <p>Timestamp: {user.time_stamp}</p>
    </div>
  );
};

const ListingPage = () => {
  const cache = useCacheAdd((state) => state.cache);
  const add = useTempStore((state) => state.add);
  const newlyAddList = useTempStore((state) => state.newlyAddList);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("users", fetchUsers, {
      getNextPageParam: (lastPage) => {
        return lastPage.users.length > 0 ? lastPage.nextCursor : undefined;
      },
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    const addNewUser = (user) => {
      add(user);
      cache({
        key: user.id,
        value: user,
      });
    };

    socket.on("user_updated", addNewUser);
    return () => {
      socket.off("user_updated", addNewUser);
    };
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading users</p>;

  return (
    <InfiniteScroll
      loadMore={fetchNextPage}
      hasMore={hasNextPage && !isFetchingNextPage}
      loader={<div key={0}>Loading...</div>}
    >
      {newlyAddList.map((user) => (
        <div key={user.id}>
          <h4>{user.id}</h4>
          <p>{user.username}</p>
          <p>Age: {user.age}</p>
          <p>Timestamp: {user.time_stamp}</p>
        </div>
      ))}
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.users.map((user) => (
            <Member user={user} key={user.id} />
          ))}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default ListingPage;
