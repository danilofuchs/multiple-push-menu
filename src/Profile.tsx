import * as React from "react";

interface Props {
  width: number;
  right: number;
  isOpen: boolean;
}
function Profile(props: Props) {
  const { width, isOpen } = props;
  return (
    <div
      id="profile"
      style={{
        transition: "all 500ms linear",
        background: "gray",
        height: "100vh",
        width: width,
        position: "absolute",
        right: isOpen ? props.right : -props.width
      }}
    />
  );
}

export default Profile;
