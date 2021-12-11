import React from "react";
import { Card, Tag, Tooltip } from "antd";
import Link from "next/link";
import { FcLike } from "react-icons/fc";
import classes from "./card.module.scss";
import Image from "next/image";
import { dateFormate } from "../../utils/dateFormate";

// const { Meta } = Card;

export const CardComponent = ({
  coverPhoto,
  title,
  likes,
  creator,
  updatedAt,
  isPrivate = true,
}) => {
  return (
    <div>
      <Link
        href={`/creator/@${creator?.username}/${title
          .split(" ")
          .join("-")
          .toLowerCase()}`}
      >
        <a>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <Image
                alt={title}
                src={coverPhoto}
                height={350}
                width={500}
                objectFit="cover"
                objectPosition="center"
              />
            }
          >
            <div className={classes.cardFooter}>
              <div className={classes.published}>
                Published On: {dateFormate(updatedAt)}
              </div>{" "}
              {isPrivate && (
                <Tooltip placement="top" title="Only You can see this Blog">
                  <Tag color="default">Private</Tag>
                </Tooltip>
              )}
              <h1>{title}</h1>
              <h3
                style={{ opacity: "0.7", fontSize: "16px", marginTop: "5px" }}
              >
                <Link href={`/creator/${creator?.username}`}>
                  <a>@{creator?.username || ""}</a>
                </Link>
              </h3>
              {/* <div className={classes.likes}>
                <FcLike /> {likes}
              </div> */}
            </div>
          </Card>
        </a>
      </Link>
    </div>
  );
};
