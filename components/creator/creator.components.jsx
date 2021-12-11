import { Form, Input } from "antd";
import Image from "next/image";
import React from "react";
import classes from "./creator.module.scss";

export const Creator = ({ userData, myProfile }) => {
  const [form] = Form.useForm();
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
        </div>
      </div>
      <div>
        <Form
          //   {...formItemLayout}
          layout="inline"
          form={form}
          //   initialValues={{
          //     layout: formLayout,
          //   }}
          //   onValuesChange={onFormLayoutChange}
        >
          <Form.Item>
            <div className={classes.searchBox}>
              <Input
                style={{ border: "none !important" }}
                className={classes.searchInput}
                placeholder="Search Blog"
                allowClear
                //   onChange={onChange}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
