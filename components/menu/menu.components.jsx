import { signOut, useSession } from "next-auth/client";
import React from "react";
import { Menu, Dropdown, Avatar, Button } from "antd";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

export const MenuComponent = () => {
  const [session, loading] = useSession();
  const handleMenuClick = (e) => {
    console.log(e.key, { visible: false });
  };

  const logout = () => {
    signOut();
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">
        <Link href={`/creator/@${session.user.username}`}>My Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <Button
          type="primary"
          onClick={logout}
          danger
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          Logout <AiOutlineLogout />
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    session && (
      <div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()} style={{ color: "black" }}>
            @{session.user.username}{" "}
            <Avatar src={session.user.profileImage} size={40} />
          </a>
        </Dropdown>
      </div>
    )
  );
};
