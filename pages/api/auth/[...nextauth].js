import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { User } from "../../../models/user/User";
import { connectDB } from "../../../config/db";
import { comparePassword } from "../../../utils/cryption";

(async () => {
  await connectDB();
})();

export default NextAuth({
  session: {
    jws: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // console.log(credentials);
        const userDetails = await User.findOne({ email: credentials.email });
        if (!userDetails) {
          throw new Error("Email not found");
          return;
        }
        if (
          !(await comparePassword(credentials.password, userDetails.password))
        ) {
          throw new Error("Invalid Email/password");
          return;
        }
        return {
          id: userDetails._id,
          email: userDetails.email,
          username: userDetails.username,
          profileImage: userDetails.profileImage,
        };
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      // console.log("call back is running");
      session.id = user.id;
      let foundUser = false;
      let userDetails = null;
      const userLogin = await User.findOne({ email: user.email }).then(
        (user) => {
          userDetails = user;
          if (user) {
            foundUser = true;
          }
          //   console.log("foundOne: ", user);
        }
      );
      // console.log(foundUser);
      if (!foundUser) {
        return;
        // let id = "";
        // const userDetails = await User.create({
        //   email: user.email,
        //   name: user.name,
        //   image: user.picture,
        // }).then((user) => {
        //   console.log("createdUser: ", user);
        // });
        // console.log("userDetails: ", userDetails);
        // return {
        //   user: {
        //     // id: userDetails._id,
        //     email: user.email,
        //     name: user.name,
        //     profileImage: user.profileImage,
        //   },
        // };
      }
      return {
        user: {
          id: userDetails._id,
          email: userDetails.email,
          username: userDetails.username,
          profileImage: userDetails.profileImage,
        },
      };
    },
  },
});
