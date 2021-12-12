import { Select, Input, Button } from "antd";
import Image from "next/image";
import React from "react";
import classes from "./creator.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Spinner } from "../loaders/spinner";
import { CardContainer } from "../cardsContainer/cardsContainer.module";
import Link from "next/link";
import { CREATOR_BLOGS } from "../querys/query";

const { Option } = Select;
export const Creator = ({ userData, myProfile }) => {
  const [title, setTitle] = React.useState("");
  const [option, setOption] = React.useState(null);
  return (
    <section className={classes.profileSection}>
      <div className={classes.profileDetails}>
        <div className={classes.profileImage}>
          <Image
            alt={userData.name}
            src={userData.profileImage}
            objectFit="cover"
            objectPosition="center"
            layout="fill"
          />
        </div>
        <div className={classes.details}>
          <h2>{userData.name}</h2>
          <div className={classes.username}>@{userData.username}</div>
          <div className={classes.bio}>{userData.bio}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Link href="/blog/create">
              <a>
                <Button
                  type="primary"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <AiOutlinePlus />
                  Blog
                </Button>
              </a>
            </Link>
            <Button type="primary">Edit Profile</Button>
          </div>
        </div>
      </div>
      <div className={classes.blogs}>
        <div style={{ width: "70%" }}>
          <Input
            size="large"
            className={classes.searchInput}
            style={{ width: "100%" }}
            value={title}
            placeholder="Search Blog"
            allowClear
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        {myProfile && (
          <div>
            <Select
              showSearch
              size="large"
              style={{ width: 200 }}
              placeholder="Blog Type"
              optionFilterProp="children"
              value={option}
              onSelect={(e) => {
                setOption(e);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={null}>All</Option>
              <Option value={true}>Private</Option>
              <Option value={false}>Public</Option>
            </Select>
          </div>
        )}
      </div>
      <div>
        <Query
          query={CREATOR_BLOGS}
          variables={{
            username: userData.username,
            title: title,
            showPrivate: option,
          }}
        >
          {({ loading, data }) => {
            if (loading) return <Spinner />;
            console.log(data);
            return <CardContainer blogs={data?.getUserBlogs?.blogs || []} />;
          }}
        </Query>
      </div>
    </section>
  );
};
