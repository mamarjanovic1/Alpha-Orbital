import { NextPage } from "next";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

const PostDeleteButton: NextPage<{ deletePost: any }> = ({ deletePost }) => {
  const [hover, setHover] = useState(Boolean);

  return (
    <div
      style={{ height: "15px", width: "20%", float: "right" }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {hover && (
        <BsFillTrashFill
          style={{ float: "right", cursor: "pointer" }}
          color="white"
          onClick={() => deletePost()}
        />
      )}
    </div>
  );
};

export default PostDeleteButton;
