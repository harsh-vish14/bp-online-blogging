import React from "react";
import { Input, Button, Form, Upload } from "antd";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import { createNotification } from "../../utils/createNotification";
import ImgCrop from "antd-img-crop";
import { uploadImages } from "../../utils/uploadImages";
import { useRouter } from "next/router";
import { useMutation } from "react-apollo";
import classes from "./account.module.scss";
import { ADD_USER } from "../querys/query";

const { TextArea } = Input;
// TODO: add register user
export const Registration = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [image, setImage] = React.useState(null);
  const [fileList, setFileList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [addUser, { data, error }] = useMutation(ADD_USER);
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 20,
    },
  };

  React.useEffect(() => {
    if (data) {
      setLoading(false);
      createNotification(
        "Account created successfully",
        "Account created successfully now user can login",
        "success"
      );
      router.replace("/account/login");
    }
    if (error) {
      for (let i = 0; i < error.graphQLErrors.length; i++) {
        const message = error.graphQLErrors[i].message;
        createNotification("Error Occurred", message, "error");
      }
      setLoading(false);
    }
  }, [data, error]);

  const onSubmit = async (values) => {
    setLoading(true);
    if (values.password !== values.confirmPassword) {
      console.log("Error found: ", values.password, values.confirmPassword);
      createNotification(
        "password did not match",
        "Confirm Password password did not match with Password",
        "error"
      );
      setLoading(false);
      return;
    }
    if (
      values?.username &&
      (values?.username.includes("@") || values?.username.includes(" "))
    ) {
      createNotification(
        "Invalid username provided",
        "Username name can not contain space or @",
        "error"
      );
      setLoading(false);
      return;
    }
    console.log(values, image);

    const saveUserWithImage = async (image) => {
      console.log("image: ", image);
      setImageUrl(image);
      addUser({
        variables: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          email: values.email,
          password: values.password,
          profileImage: image,
        },
      });
    };

    if (image) {
      await uploadImages(image, "profile/", saveUserWithImage, imageUrl);
    } else {
      console.log("save user without image");
      addUser({
        variables: {
          name: values.name,
          username: values.username,
          bio: values.bio,
          email: values.email,
          password: values.password,
          profileImage: null,
        },
      });
    }
  };

  const action = (as) => {
    if (as) {
      setImage(as);
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    console.log("file: ", file.url);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className={classes.form}>
      <div className={classes.formTitle}>Register</div>
      <div className={classes.formItems}>
        <div style={{ textAlign: "center" }}>
          <ImgCrop rotate onModalOk={action}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ Upload Profile Image"}
            </Upload>
          </ImgCrop>
        </div>
        <Form form={form} {...layout} name="control-ref" onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Name" size="large" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={4} placeholder="Bio" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm password"
              iconRender={(visible) =>
                visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
              }
            />
          </Form.Item>
          <Button type="primary" block htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form>

        <div className={classes.otherBtn}>
          <div>
            <Link href="/forget">Forget Password ?</Link>
          </div>
          <div>
            <Link href="/account/login">Having Account ? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
