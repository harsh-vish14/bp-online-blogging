import { Blog } from "../../models/blogs/Blog";
import { User } from "../../models/user/User";
import { hashing, comparePassword } from "../../utils/cryption";
import { ErrorResponse } from "../../utils/ErrorResponse";
import { sendEmail } from "../../utils/sendEmail";
import {
  RESET_PASSWORD_TEMPLATE,
  FORGET_PASSWORD_TEMPLATE,
} from "../utils/templetes";
import crypto from "crypto";

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
  { id, name, email, bio, profileImage },
  { session }
) => {
  try {
    const userValidation = await User.findOne({ _id: id });
    if (!userValidation) {
      throw new ErrorResponse("User not found", 404);
    }

    if (!session || session.user.id !== id) {
      throw new ErrorResponse("Invalid authorization", 401);
    }
    await User.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
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
  { username, title, showPrivate },
  { session }
) => {
  try {
    const userValidation = await User.findOne({
      username: { $regex: username, $options: "i" },
    });
    if (!userValidation) {
      throw new ErrorResponse("User not found", 404);
    }
    // console.log(session);

    let isCreator = false;
    if (session && session.user.id == String(userValidation._id)) {
      isCreator = true;
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

export const resetPassword = async (_, {}, { session }) => {
  if (!session) {
    throw new ErrorResponse("You need to login to website first", 401);
  }
  const userDetails = await User.findOne({ _id: session.user.id });
  if (!userDetails) {
    throw new ErrorResponse("Login user not found", 404);
  }
  try {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    crypto.randomBytes(32, async (err, buffer) => {
      const token = buffer.toString("hex");
      const subject = "Reset Password";
      const body = RESET_PASSWORD_TEMPLATE(token);
      const to = [userDetails.email];
      await sendEmail(subject, body, to);
      await User.findOneAndUpdate(
        { _id: session.user.id },
        { resetToken: { token, expire: date.toISOString() } }
      );
    });
  } catch (err) {
    throw new ErrorResponse("Error Happened,Please try again later", 500);
  }
};

export const resetPasswordWithToken = async (
  _,
  { token, oldPassword, newPassword }
) => {
  const userDetails = await User.findOne({ "resetToken.token": token });
  if (!userDetails) {
    throw new ErrorResponse("Token not found", 404);
  }
  if (!(await comparePassword(oldPassword, userDetails.password))) {
    throw new ErrorResponse("Password did not match", 400);
  }

  const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (newPassword.search(/[0-9]/) == -1) {
    throw new ErrorResponse("Password must contain atleast 6 characters", 400);
  } else if (newPassword.search(/[a-z]/) == -1) {
    throw new ErrorResponse(
      "Password must contain one lower case character",
      400
    );
  } else if (newPassword.search(/[A-Z]/) == -1) {
    throw new ErrorResponse(
      "Password must contain one upper case character",
      400
    );
  } else if (!specialCharacterFormat.test(newPassword)) {
    throw new ErrorResponse("Password must contain special character", 400);
  }
  const currentDate = new Date();
  const expiryDate = new Date(userDetails.resetToken.expiry);
  if (currentDate > expiryDate) {
    await User.findOneAndUpdate(
      { "resetToken.token": token },
      { resetToken: { token: null, expire: null } }
    );
    throw new ErrorResponse("Token is Expired", 400);
  }

  const hashingPassword = await hashing(newPassword);
  await await User.findOneAndUpdate(
    { "resetToken.token": token },
    { resetToken: { token: null, expire: null }, password: hashingPassword }
  );
  return {
    success: true,
    message: "Password updated successfully",
  };
};

export const forgetPassword = async (_, { email }) => {
  const userDetails = await User.findOne({ email: email });
  if (!userDetails) {
    throw new ErrorResponse("Email not found", 404);
  }

  try {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    crypto.randomBytes(32, async (err, buffer) => {
      const token = buffer.toString("hex");
      const subject = "Forget Password";
      const body = FORGET_PASSWORD_TEMPLATE(token);
      const to = [userDetails.email];
      await sendEmail(subject, body, to);
      await User.findOneAndUpdate(
        { _id: userDetails._id },
        { resetToken: { token, expire: date.toISOString() } }
      );
    });
  } catch (err) {
    throw new ErrorResponse("Error Happened,Please try again later", 500);
  }
};

export const forgetPasswordWithToken = async (
  _,
  { token, newPassword, confirmPassword }
) => {
  if (newPassword !== confirmPassword) {
    throw new ErrorResponse("Password did not match", 400);
  }
  const userDetails = await User.findOne({ "resetToken.token": token });
  if (!userDetails) {
    throw new ErrorResponse("Token not found", 404);
  }

  const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (newPassword.search(/[0-9]/) == -1) {
    throw new ErrorResponse("Password must contain atleast 6 characters", 400);
  } else if (newPassword.search(/[a-z]/) == -1) {
    throw new ErrorResponse(
      "Password must contain one lower case character",
      400
    );
  } else if (newPassword.search(/[A-Z]/) == -1) {
    throw new ErrorResponse(
      "Password must contain one upper case character",
      400
    );
  } else if (!specialCharacterFormat.test(newPassword)) {
    throw new ErrorResponse("Password must contain special character", 400);
  }
  const currentDate = new Date();
  const expiryDate = new Date(userDetails.resetToken.expiry);
  if (currentDate > expiryDate) {
    await User.findOneAndUpdate(
      { "resetToken.token": token },
      { resetToken: { token: null, expire: null } }
    );
    throw new ErrorResponse("Token is Expired", 400);
  }

  const hashingPassword = await hashing(newPassword);
  await await User.findOneAndUpdate(
    { "resetToken.token": token },
    { resetToken: { token: null, expire: null }, password: hashingPassword }
  );
  return {
    success: true,
    message: "Password updated successfully",
  };
};
