import * as React from "react";
import * as ReactDOM from "react-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  element = document.createElement("div");

  componentDidMount() {
    const pageElement = document.getElementById("page-container");
    pageElement.appendChild(this.element);
  }
  componentWillUnmount() {
    const pageElement = document.getElementById("page-container");
    pageElement.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default Sidebar;
