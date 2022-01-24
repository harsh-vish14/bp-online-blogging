import React from "react";
import { Input, Button } from "antd";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMutation } from "react-apollo";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import blogLoader from "../../animation/blog_loader.json";
import { useSession } from "next-auth/client";
import { createNotification } from "../../utils/createNotification";
import { uploadImages } from "../../utils/uploadImages";
import { ADD_BLOG, UPDATE_BLOG } from "../querys/query.js";
import { useRouter } from "next/router";
import classes from "./blog_create_update.module.scss";
import { cacheClear } from "../../pages/_app";
import LottieAnimation from "../lottie/lottieAnimation";

const STARTER_CODE = `# Getting Started

Welcome Here this is your editor ---> that is your preview of MD code / HTML Code
Here you can add

MD 
> THIS IS MD (MARKDOWN) CODE

HTML
<h1>This is HTML CODE</h1>`;

const DEFAULT_COVER_PHOTO =
  "https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=100";

export const Creat_Update_Blog = ({ blog }) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = React.useState(false);
  const [session, loadingSession] = useSession();
  const [addBlog, { data, loading, error }] = useMutation(ADD_BLOG);
  const [updateBlog, response] = useMutation(UPDATE_BLOG);
  const [imageFile, setImageFile] = React.useState(null);
  const [imageFileImage, setImageFileImage] = React.useState(
    blog?.coverPhoto || DEFAULT_COVER_PHOTO
  );
  const [imageUrl, setImageUrl] = React.useState("");
  const [title, setTitle] = React.useState(blog?.title || "");
  const [content, setContent] = React.useState(blog?.content || STARTER_CODE);
  const [isPrivate, setIsPrivate] = React.useState(blog?.isPrivate || false);

  const imageAdded = (image) => {
    const currentImage = image.target.files[0];
    setImageFile(currentImage);
    const url = URL.createObjectURL(currentImage);
    setImageFileImage(url);
  };

  const createBlog = async () => {
    setPageLoading(true);
    if (imageFile) {
      await uploadImages(imageFile, "coverImage/", submitWithImage, imageUrl);
    } else {
      await addBlog({
        variables: {
          creator: session.user.id,
          coverPhoto: null,
          title: title,
          content: content,
          isPrivate: isPrivate,
        },
      });
    }
  };
  const EditBlog = async () => {
    setPageLoading(true);
    if (imageFile) {
      await uploadImages(
        imageFile,
        "coverImage/",
        submitWithImageEdit,
        imageUrl
      );
    } else {
      await updateBlog({
        variables: {
          updateBlogId: blog._id,
          coverPhoto: null,
          title: title,
          content: content,
          isPrivate: isPrivate,
        },
      });
    }
  };
  const submitWithImageEdit = async (image) => {
    console.log(image);
    setImageUrl(image);
    await updateBlog({
      variables: {
        updateBlogId: blog._id,
        coverPhoto: image,
        title: title,
        content: content,
        isPrivate: isPrivate,
      },
    });
  };

  const submitWithImage = async (image) => {
    console.log(image);
    setImageUrl(image);
    await addBlog({
      variables: {
        creator: session.user.id,
        coverPhoto: image,
        title: title,
        content: content,
        isPrivate: isPrivate,
      },
    });
  };
  React.useEffect(() => {
    (async () => {
      // const cache = new InMemoryCache();

      if (data) {
        console.log(data);
        createNotification(
          "Blog Created",
          "Blog Has Created successfully",
          "success"
        );
        cacheClear();
        router.push(
          `/creator/@${session.user.username}/${title
            .split(" ")
            .join("-")
            .toLowerCase()}`
        );
        setPageLoading(false);
      }
      if (error) {
        //   console.log(JSON.stringify(error));
        createNotification(
          "Error Occurred",
          error.graphQLErrors[0].message,
          "error"
        );
        setPageLoading(false);
      }
    })();
  }, [data, error]);

  React.useEffect(() => {
    if (response.data) {
      console.log(response.data);
      createNotification(
        "Blog Update, It will take some time to reflect everywhere, about 10-11 mins it will take",
        response.data.updateBlog.message,
        "success"
      );
      cacheClear();
      router.push(
        `/creator/@${session.user.username}/${title
          .split(" ")
          .join("-")
          .toLowerCase()}`
      );
      setPageLoading(false);
    }
    if (response.error) {
      console.log(JSON.stringify(response.error));
      console.log(blog._id);
      createNotification(
        "Error Occurred",
        response.error.graphQLErrors,
        "error"
      );
      setPageLoading(false);
    }
  }, [response.data, response.error]);

  if (loading || response.loading || pageLoading) {
    return <LottieAnimation lottie={blogLoader} width={300} height={300} />;
  }

  return (
    <>
      <div className={classes.btns}>
        {!blog ? (
          <Button
            type="primary"
            disabled={content.length === 0 || title.length === 0}
            onClick={createBlog}
          >
            Create Blog
          </Button>
        ) : (
          <Button
            type="primary"
            disabled={content.length === 0 || title.length === 0}
            onClick={EditBlog}
          >
            Save Edit
          </Button>
        )}
        {isPrivate ? (
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
            }}
            onClick={() => {
              setIsPrivate(true);
            }}
          >
            <AiOutlineEyeInvisible /> Private
          </Button>
        ) : (
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
            }}
            onClick={() => {
              setIsPrivate(false);
            }}
          >
            <AiOutlineEye /> Public
          </Button>
        )}
      </div>
      <section className={classes.topSection}>
        <div className={classes.coverPhoto}>
          <div className={classes.titleImage}>
            <Image
              src={imageFileImage}
              alt={title}
              objectFit="cover"
              objectPosition="center"
              layout="fill"
            />
            <label className={classes.editBackground} htmlFor="inputImage">
              EDIT
            </label>
            <input
              id="inputImage"
              type="file"
              accept="image/jpeg,image/png"
              style={{ display: "none" }}
              onChange={imageAdded}
            />
          </div>
        </div>
        <div className={classes.title}>
          <Input
            placeholder="Blog Title"
            size="large"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </section>
      <section className={classes.editor}>
        <MdEditor
          style={{ height: "100%" }}
          value={content}
          onChange={(e) => {
            setContent(e.text);
          }}
          renderHTML={(text) => {
            return (
              <ReactMarkdown
                linkTarget="_blank"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                children={text}
              />
            );
          }}
        />
      </section>
    </>
  );
};
