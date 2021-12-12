import React from "react";
import { Modal, Card, Tag, Tooltip } from "antd";
import Link from "next/link";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { dateFormate } from "../../utils/dateFormate";
import Image from "next/image";
import classes from "./card.module.scss";
import { useMutation } from "react-apollo";
import {
  DELETE_BLOG_BY_ID,
  GET_BLOGS_BY_TITLE,
  CREATOR_BLOGS,
} from "../querys/query";
import { cacheClear } from "../../pages/_app";
import { createNotification } from "../../utils/createNotification";

const { confirm } = Modal;

export const CardComponent = ({
  coverPhoto,
  title,
  likes,
  creator,
  updatedAt,
  isPrivate = true,
  id,
}) => {
  const [deleteBlog, { data, loading, error }] = useMutation(DELETE_BLOG_BY_ID);
  function showConfirm() {
    confirm({
      title: "Do you Want to delete these Blog?",
      icon: <AiOutlineExclamationCircle fontSize={30} color="#faad14" />,
      content: "After deleting these Blog you cannot get the blog data again",
      onOk() {
        console.log("delete this --> blog: ", id);

        deleteBlog({
          variables: { deleteBlogId: id },
        });
        createNotification(
          "Deleting Blog",
          "Deleting blog please wait...",
          "info"
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  React.useEffect(() => {
    if (data) {
      createNotification(
        "Delete Successfully",
        "Blog deleted successfully",
        "success"
      );
      cacheClear();
      window.location.reload();
    }
    if (error) {
      createNotification(
        "Error Occurred",
        "Some error happened Please try again",
        "error"
      );
    }
  }, [data, error]);
  return (
    <div>
      <Card
        hoverable
        style={{
          cursor: "default",
          minWidth: "100%",
          cursor: "default",
          maxWidth: "350px",
        }}
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
        actions={[
          // TODO: Please add validation here
          <Tooltip placement="top" title="Edit Blog" key="edit">
            <div>
              <Link href={`/blog/${title.split(" ").join("-").toLowerCase()}`}>
                <a style={{ color: "#0000007a" }}>
                  <AiFillEdit />
                </a>
              </Link>
            </div>
          </Tooltip>,
          <Tooltip placement="top" title="Delete Blog" key="delete">
            <div style={{ color: "#0000007a" }} onClick={showConfirm}>
              <AiFillDelete />
            </div>
          </Tooltip>,
        ]}
      >
        <Link
          href={`/creator/@${creator?.username}/${title
            .split(" ")
            .join("-")
            .toLowerCase()}`}
        >
          <a>
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
              <div className={classes.actions}></div>
            </div>
          </a>
        </Link>
      </Card>
    </div>
  );
};
