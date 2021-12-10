import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { useSession } from "next-auth/client";
const { TextArea } = Input;

export const CommentComponent = ({ comments }) => {
  const [session, loading] = useSession();

  const [textArea, setTextArea] = React.useState("");
  const commentSubmitted = (data) => {
    console.log(data);
  };
  return (
    <div>
      Comments here
      {!loading && session && (
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
              value={textArea}
            />
          }
        />
      )}
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
