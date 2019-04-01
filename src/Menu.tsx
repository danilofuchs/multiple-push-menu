import * as React from "react";

interface Props {
  width: number;
  isOpen: boolean;
  left: number;
}
function Menu(props: Props) {
  return (
    <div
      id="menu"
      style={{
        transition: "all 500ms linear",
        background: "black",
        height: "100vh",
        width: props.width,
        position: "absolute",
        left: props.left
      }}
    />
  );
}
export default Menu;
