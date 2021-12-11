import React from "react";
import { Input } from "antd";
import { CardContainer } from "../cardsContainer/cardsContainer.module";
import classes from "./main.module.scss";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Spinner } from "../loaders/spinner";

const GET_BLOGS_BY_TITLE = gql`
  query allBlogs($title: String) {
    allBlogs(title: $title) {
      success
      blogs {
        id
        isPrivate
        title
        coverPhoto
        updatedAt
        likes
        creator {
          username
          id
        }
      }
    }
  }
`;

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
        <Query query={GET_BLOGS_BY_TITLE} variables={{ title: search }}>
          {({ loading, data }) => {
            if (loading) return <Spinner />;
            console.log(data.allBlogs.blogs);
            return <CardContainer blogs={data?.allBlogs?.blogs} />;
          }}
        </Query>
      </div>
    </div>
  );
};
