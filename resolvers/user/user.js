import { Blog } from "../../models/blogs/Blog";
import { User } from "../../models/user/User";
import { hashing, comparePassword } from "../../utils/cryption";
import { ErrorResponse } from "../../utils/ErrorResponse";

export const createUser = async (
  _,
  { name, email, password, bio, profileImage, username }
) => {
  try {
    const emailValidation = await User.findOne({ email });
    if (emailValidation) {
      throw new ErrorResponse("Email already exists", 400);
    }

    const usernameValidation = await User.findOne({
      username: { $regex: username, $options: "i" },
    });
    if (usernameValidation) {
      throw new ErrorResponse("User name already exists", 400);
    }

    const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (password.search(/[0-9]/) == -1) {
      throw new ErrorResponse(
        "Password must contain atleast 6 characters",
        400
      );
    } else if (password.search(/[a-z]/) == -1) {
      throw new ErrorResponse(
        "Password must contain one lower case character",
        400
      );
    } else if (password.search(/[A-Z]/) == -1) {
      throw new ErrorResponse(
        "Password must contain one upper case character",
        400
      );
    } else if (!specialCharacterFormat.test(password)) {
      throw new ErrorResponse("Password must contain special character", 400);
    }
    const hashedPassword = await hashing(password);

    const userDetails = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio,
      profileImage,
    });
    return {
      success: true,
      user: userDetails,
    };
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export const updateUser = async (
  _,
  { id, name, email, password, bio, profileImage }
) => {
  try {
    const userValidation = await User.findOne({ _id: id });
    if (!userValidation) {
      throw new ErrorResponse("User not found", 404);
    }
    let updatedPassword = null;
    if (password) {
      const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

      if (password.search(/[0-9]/) == -1) {
        throw new ErrorResponse(
          "Password must contain atleast 6 characters",
          400
        );
      } else if (password.search(/[a-z]/) == -1) {
        throw new ErrorResponse(
          "Password must contain one lower case character",
          400
        );
      } else if (password.search(/[A-Z]/) == -1) {
        throw new ErrorResponse(
          "Password must contain one upper case character",
          400
        );
      } else if (!specialCharacterFormat.test(password)) {
        throw new ErrorResponse("Password must contain special character", 400);
      }
      const hashedPassword = hashing(password);
      updatedPassword = hashedPassword;
    }

    await User.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        password,
        bio,
        profileImage,
      }
    );
    const userDetails = await User.findOne({ _id: id });
    return {
      success: true,
      user: userDetails,
    };
  } catch (err) {
    throw new ErrorResponse(err, 500);
  }
};

export const loginUser = async (_, { email, password }) => {
  const userEmailValidation = await User.findOne({ email: email });
  if (!userEmailValidation) {
    throw new ErrorResponse("Email not found", 404);
  }
  if (!(await comparePassword(password, userEmailValidation.password))) {
    throw new ErrorResponse("Invalid email/password", 400);
  }

  return {
    success: true,
    message: "Login successful",
    user: userEmailValidation,
  };
};

export const getUserBlogs = async (
  _,
  { username, AUTH_KEY, title, showPrivate }
) => {
  try {
    let isCreator = false;
    if (AUTH_KEY && AUTH_KEY === process.env.AUTH_KEY) {
      isCreator = true;
    }
    const userValidation = await User.findOne({
      username: { $regex: username, $options: "i" },
    });
    if (!userValidation) {
      throw new ErrorResponse("User not found", 404);
    }
    let search = {
      creator: userValidation._id,
    };
    if (title) {
      search.title = { $regex: title, $options: "i" };
    }
    if (showPrivate != null && isCreator) {
      search.isPrivate = showPrivate;
    } else {
      search.$or = [{ isPrivate: isCreator }, { isPrivate: false }];
    }
    const blogs = await Blog.find(search)
      .sort({ updatedAt: -1 })
      .populate("creator");
    return {
      success: true,
      blogs,
    };
  } catch (err) {
    throw new ErrorResponse(err);
  }
};
