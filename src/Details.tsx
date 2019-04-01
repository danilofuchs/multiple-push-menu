import * as React from "react";

interface Props {
  width: number;
  left: number;
  isOpen: boolean;
}
function Details(props: Props) {
  const { width, isOpen } = props;
  return (
    <div
      id="details"
      style={{
        transition: "left 500ms linear",
        background: "green",
        height: "100vh",
        width: width,
        position: "absolute",
        left: isOpen ? props.left : -props.width
      }}
    />
  );
}

export default Details;
