import * as React from "react";
import Query from "react-responsive";

interface Props {
  width: number;
  isOpen: boolean;
  left: number;
}
function Menu(props: Props) {
  return (
    <Query maxWidth={768}>
      {isMobile => (
        <div
          className={isMobile ? "aaa" : "bbb"}
          id="menu"
          style={{
            transition: "all 500ms linear",
            background: "black",
            height: "100vh",
            width: isMobile ? "100vw" : props.width,
            position: "absolute",
            left: isMobile && props.isOpen ? 0 : props.left,
            zIndex: 2
          }}
        />
      )}
    </Query>
  );
}
export default Menu;
