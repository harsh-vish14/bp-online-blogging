import { Empty } from "antd";

import React from "react";

export const NoBlogs = ({ description }) => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={<span>{description || ""}</span>}
  ></Empty>
);
