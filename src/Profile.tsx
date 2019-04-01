import * as React from "react";
import Query from "react-responsive";

interface Props {
  width: number;
  right: number;
  isOpen: boolean;
}
function Profile(props: Props) {
  const { width, isOpen } = props;
  return (
    <Query maxWidth={768}>
      {isMobile => (
        <div
          id="profile"
          style={{
            transition: "all 500ms linear",
            background: "gray",
            height: "100vh",
            width: isMobile ? "100vw" : width,
            position: "absolute",
            zIndex: 3,
            right: isMobile
              ? isOpen
                ? props.right
                : "-100vw"
              : isOpen
              ? props.right
              : -props.width
          }}
        />
      )}
    </Query>
  );
}

export default Profile;
