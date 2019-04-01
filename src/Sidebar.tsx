import * as React from "react";
import * as ReactDOM from "react-dom";

const appElement = document.getElementById("app");
interface Props {
  children: React.ReactNode;
}
class Sidebar extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  element = document.createElement("div");

  componentDidMount() {
    const pageElement = document.getElementById("app-container");
    if (pageElement) {
      pageElement.insertBefore(this.element, pageElement.firstChild);
    }
  }
  componentWillUnmount() {
    const pageElement = document.getElementById("app-container");
    if (pageElement) {
      pageElement.removeChild(this.element);
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.element);
  }
}

export default Sidebar;
