import React from "react";
import { Input } from "antd";
import { CardContainer } from "../cardsContainer/cardsContainer.module";
import classes from "./main.module.scss";

const DUMMY_DATA = [
  {
    title: "Dummy date title",
    coverPhoto:
      "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1870&q=80",
    likes: 12,
    updatedAt: "2021-12-07T15:09:55+0000",
    creator: {
      username: "harshkv",
    },
    isPrivate: false,
  },
  {
    title: "Dummy date title",
    coverPhoto:
      "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1870&q=80",
    likes: 12,
    updatedAt: "2021-12-07T15:09:55+0000",
    creator: {
      username: "harshkv",
    },
    isPrivate: false,
  },
  {
    title: "Dummy date title",
    coverPhoto:
      "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1870&q=80",
    likes: 12,
    updatedAt: "2021-12-07T15:09:55+0000",
    creator: {
      username: "harshkv",
    },
    isPrivate: false,
  },
];

export const Main = () => {
  const [search, setSearch] = React.useState("");
  const onChange = (text) => {
    setSearch(text.target.value);
  };
  return (
    <div className={classes.main}>
      <div className={classes.searchBox}>
        <Input
          style={{ border: "none !important" }}
          className={classes.searchInput}
          placeholder="Search Blog"
          allowClear
          onChange={onChange}
        />
      </div>
      <div>
        <CardContainer blogs={DUMMY_DATA} />
      </div>
    </div>
  );
};
