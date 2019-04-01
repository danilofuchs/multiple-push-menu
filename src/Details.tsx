import * as React from "react";
import Query from "react-responsive";

interface Props {
  width: number;
  left: number;
  isOpen: boolean;
}
function Details(props: Props) {
  const { width, isOpen } = props;
  return (
    <Query maxWidth={768}>
      {isMobile => (
        <div
          id="details"
          style={{
            transition: "all 500ms linear",
            background: "green",
            height: "100vh",
            width: isMobile ? "100vw" : width,
            position: "absolute",
            zIndex: 3,
            left: isMobile
              ? isOpen
                ? 0
                : "-100vw"
              : isOpen
              ? props.left
              : -props.width
          }}
        />
      )}
    </Query>
  );
}

export default Details;
