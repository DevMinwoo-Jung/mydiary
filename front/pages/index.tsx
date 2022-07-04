import type { NextPage } from "next";
import { memo } from "react";

const _index: NextPage = () => {
  return <div>Content</div>;
};

const index = memo(_index)

export default index;