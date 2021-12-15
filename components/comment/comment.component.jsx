import React from "react";
import { Comment, Avatar, Form, Button, Tooltip, Input } from "antd";
import { useSession } from "next-auth/client";
const { TextArea } = Input;
import { Query } from "react-apollo";
import { Spinner } from "../loaders/spinner";
import moment from "moment";
import { useMutation } from "react-apollo";
import Linkify from "react-linkify";
import Link from "next/link";
import {
  GET_COMMENTS_BY_BLOG_ID,
  ADD_COMMENT_IN_BLOG_BY_ID,
  DELETE_COMMENT_BY_ID,
} from "../querys/query";

import classes from "./comment.module.scss";

export const CommentComponent = ({ blogId }) => {
  const [loading, setLoading] = React.useState(false);
  const [session, SessionLoading] = useSession();
  const [addComment, { data, error }] = useMutation(ADD_COMMENT_IN_BLOG_BY_ID, {
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_BLOG_ID,
        variables: { blogId: blogId },
      },
    ],
  });
  const [textArea, setTextArea] = React.useState("");
  const commentSubmitted = () => {
    setLoading(true);
    addComment({
      variables: {
        blogId: blogId,
        message: textArea,
      },
    });
    setTextArea("");
  };

  React.useEffect(() => {
    if (data) {
      setLoading(false);
    }
    if (error) {
      for (let i = 0; i < error.graphQLErrors.length; i++) {
        const message = error.graphQLErrors[i].message;
        createNotification("Error Occurred", message, "error");
      }
    }
  }, [data, error]);
  return (
    <div className={classes.comments}>
      Comments here
      {!SessionLoading && session && (
        <Comment
          avatar={
            <Avatar src={session.user.profileImage} alt={session.user.name} />
          }
          content={
            <Editor
              onSubmit={commentSubmitted}
              onChange={(e) => {
                setTextArea(e.target.value);
              }}
              submitting={loading}
              value={textArea}
            />
          }
        />
      )}
      <CommentDisplay
        blogId={blogId}
        session={session}
        SessionLoading={SessionLoading}
      />
    </div>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentDisplay = ({ blogId, session, SessionLoading }) => {
  const [deleteComment, { data, error }] = useMutation(DELETE_COMMENT_BY_ID, {
    refetchQueries: [
      {
        query: GET_COMMENTS_BY_BLOG_ID,
        variables: { blogId: blogId },
      },
    ],
  });

  React.useEffect(() => {
    if (error) {
      for (let i = 0; i < error.graphQLErrors.length; i++) {
        const message = error.graphQLErrors[i].message;
        createNotification("Error Occurred", message, "error");
      }
    }
  }, [data, error]);

  return (
    <Query query={GET_COMMENTS_BY_BLOG_ID} variables={{ blogId: blogId }}>
      {({ loading, data }) => {
        if (loading) return <Spinner height={100} width={100} />;
        console.log(data);
        return data?.commentsByBlogId?.comments ? (
          data?.commentsByBlogId?.comments.map((comments) => {
            return (
              <Comment
                actions={
                  !SessionLoading &&
                  session &&
                  session.user.id === comments.commentedBy.id
                    ? [
                        <Tooltip key="delete" title="Delete Comment">
                          <span
                            onClick={() => {
                              deleteComment({
                                variables: { commentId: comments.id },
                              });
                              console.log(
                                "OOOOOOOOOOO i am get clicked with comment id: ",
                                comments.id
                              );
                            }}
                          >
                            Delete
                          </span>
                        </Tooltip>,
                      ]
                    : []
                }
                style={{ fontSize: 20 }}
                key={comments.id}
                author={
                  <span style={{ textTransform: "capitalize" }}>
                    {comments.commentedBy.name}
                  </span>
                }
                avatar={
                  <Link href={`/creator/@${comments.commentedBy.username}`}>
                    <a>
                      <Avatar
                        src={comments.commentedBy.profileImage}
                        alt={comments.commentedBy.name}
                      />
                    </a>
                  </Link>
                }
                content={
                  <Linkify
                    properties={{
                      target: "_blank",
                    }}
                  >
                    {comments.message}
                  </Linkify>
                }
                datetime={
                  <Tooltip
                    title={moment(
                      new Date(Number(comments.updatedAt)).toISOString()
                    ).format("YYYY-MM-DD HH:mm:ss")}
                  >
                    <span>
                      {moment(
                        new Date(Number(comments.updatedAt)).toISOString()
                      ).fromNow()}
                    </span>
                  </Tooltip>
                }
              />
            );
          })
        ) : (
          <div>Be First To Comment</div>
        );
      }}
    </Query>
  );
};
