import { Input, Button, Modal, Form, Upload } from "antd";
import React from "react";
import ImgCrop from "antd-img-crop";
import { useMutation } from "react-apollo";
import classes from "./edittCreator.module.scss";
import { UPDATE_USER } from "../querys/query";
import { uploadImages } from "../../utils/uploadImages";
import { createNotification } from "../../utils/createNotification";

const { TextArea } = Input;

export const EditProfile = ({ userData }) => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
  const [imageFile, setImageFile] = React.useState(null);

  const [fileList, setFileList] = React.useState([
    { uid: "1", name: "image.png", status: "done", url: userData.profileImage },
  ]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 20,
    },
  };

  React.useEffect(() => {
    form.setFieldsValue({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
    });
  }, [userData]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onSubmit = async (values) => {
    console.log(values);

    const submitWithImage = async (image) => {
      updateUser({
        variables: {
          updateUserId: userData._id,
          name: values.name,
          bio: values.bio,
          email: values.email,
          profileImage: image,
        },
      });
    };

    if (imageFile) {
      await uploadImages(
        imageFile,
        "profile/",
        submitWithImage,
        userData.profileImage
      );
    } else {
      updateUser({
        variables: {
          updateUserId: userData._id,
          name: values.name,
          bio: values.bio,
          email: values.email,
          profileImage: userData.profileImage,
        },
      });
    }
  };

  const action = (as) => {
    if (as) {
      setImageFile(as);
    }
  };

  React.useEffect(() => {
    if (data) {
      console.log(data);
      createNotification(
        "Updated Profile",
        "Profile is update, In some time it will reflect everywhere",
        "success"
      );
      setIsModalVisible(false);
      setImageFile(null);
    }
    if (error) {
      console.log(error);
      createNotification(
        "Error Occurred",
        "Please refresh the page and try again",
        "error"
      );
    }
  }, [data, error]);
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
    <>
      <Button type="primary" onClick={showModal}>
        Edit Profile
      </Button>
      <Modal
        title="Update Profile"
        okText="Update Profile"
        visible={isModalVisible}
        footer={null}
        // confirmLoading={loading}
        // onOk={onSubmit}
        onCancel={handleCancel}
      >
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
            {/* <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Username" size="large" />
            </Form.Item> */}
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
            <Button type="primary" block htmlType="submit" loading={loading}>
              Update Profile
            </Button>
          </Form>

          {/* <div className={classes.otherBtn}>
            <div>Forget Password ?</div>
          </div> */}
        </div>
      </Modal>
    </>
  );
};
