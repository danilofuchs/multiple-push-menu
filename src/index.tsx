import * as React from "react";
import { render } from "react-dom";
import Query from "react-responsive";
import { Provider, Subscribe, Container } from "unstated";

import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Details from "./Details";
import Profile from "./Profile";

interface SidebarConfig {
  width: number;
  position: "left" | "right";
}
interface SidebarConfigs {
  [x: string]: SidebarConfig;
}
const sidebars: SidebarConfigs = {
  details: {
    width: 100,
    position: "left"
  },
  profile: {
    width: 150,
    position: "right"
  }
};

const menuConfig: SidebarConfig = {
  width: 300,
  position: "left"
};

type LayoutState = {
  isMenuOpen: boolean;
  menuLeft: number;
  pageLeft: number;
  leftSidebar: {
    key: string | null;
    isOpen: boolean;
    left: number;
  };
  rightSidebar: {
    key: string | null;
    isOpen: boolean;
    right: number;
  };
};

class LayoutContainer extends Container<LayoutState> {
  constructor() {
    super();

    this.state = {
      isMenuOpen: false,
      menuLeft: -menuConfig.width,
      leftSidebar: {
        key: null,
        isOpen: false,
        left: 0
      },
      rightSidebar: {
        key: null,
        isOpen: false,
        right: 0
      },
      pageLeft: 0
    };
  }

  toggleMenu(newState: boolean) {
    if (newState !== this.state.isMenuOpen) {
      this.setState({ isMenuOpen: newState });
      if (newState === true) {
        this.setState({ menuLeft: 0 });
        this.addPxLeftToPage(menuConfig.width);
        this.addPxLeftToLeftSidebar(menuConfig.width);
      } else if (newState === false) {
        this.setState({ menuLeft: -menuConfig.width });
        this.addPxLeftToPage(-menuConfig.width);
        this.addPxLeftToLeftSidebar(-menuConfig.width);
      }
    }
  }

  toggleLeftSidebar(key: string, newState: boolean) {
    if (sidebars.hasOwnProperty(key)) {
      this.closeRight();
      const sidebarConfig = sidebars[key];
      let positionLeft = -sidebarConfig.width;
      if (newState === true) {
        positionLeft = 0;
      }
      if (this.state.isMenuOpen) {
        positionLeft += menuConfig.width;
      }

      this.setState({
        leftSidebar: {
          key,
          isOpen: newState,
          left: positionLeft
        }
      });

      if (newState === true) {
        this.addPxLeftToPage(sidebarConfig.width);
      } else if (newState === false) {
        this.addPxLeftToPage(-sidebarConfig.width);
      }
    } else {
      throw new Error(
        `Invalid key ${key}. Available: ${Object.keys(sidebars).toString()}`
      );
    }
  }

  toggleRightSidebar(key: string, newState: boolean) {
    if (sidebars.hasOwnProperty(key)) {
      this.closeLeft();
      this.toggleMenu(false);
      const sidebarConfig = sidebars[key];
      let positionRight = -sidebarConfig.width;
      if (newState === true) {
        positionRight = 0;
      }

      this.setState({
        rightSidebar: {
          key,
          isOpen: newState,
          right: positionRight
        }
      });

      if (newState === true) {
        this.addPxLeftToPage(-sidebarConfig.width);
      } else if (newState === false) {
        this.addPxLeftToPage(sidebarConfig.width);
      }
    } else {
      throw new Error(
        `Invalid key ${key}. Available: ${Object.keys(sidebars).toString()}`
      );
    }
  }

  private closeLeft() {
    if (
      this.state.leftSidebar.key &&
      sidebars[this.state.leftSidebar.key] &&
      this.state.leftSidebar.isOpen === true
    ) {
      this.toggleLeftSidebar(this.state.leftSidebar.key, false);
    }
  }
  private closeRight() {
    if (
      this.state.rightSidebar.key &&
      sidebars[this.state.rightSidebar.key] &&
      this.state.rightSidebar.isOpen === true
    ) {
      this.toggleRightSidebar(this.state.rightSidebar.key, false);
    }
  }
  private addPxLeftToPage(px: number) {
    this.setState(prevState => ({ pageLeft: prevState.pageLeft + px }));
  }
  private addPxLeftToLeftSidebar(px: number) {
    this.setState(prevState => ({
      leftSidebar: {
        ...prevState.leftSidebar,
        left: prevState.leftSidebar.left + px
      }
    }));
  }
}

function App() {
  return (
    <Subscribe to={[LayoutContainer]}>
      {(layout: LayoutContainer) => (
        <>
          <div className="app" id="app-container" style={{ position: "fixed" }}>
            <Sidebar>
              <Menu
                width={menuConfig.width}
                isOpen={layout.state.isMenuOpen}
                left={layout.state.menuLeft}
              />
            </Sidebar>
            <Sidebar>
              <Profile
                width={sidebars.profile.width}
                isOpen={isOpen(layout.state.rightSidebar, "profile")}
                right={layout.state.rightSidebar.right}
              />
            </Sidebar>

            <div
              className="page"
              id="page-container"
              style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                left: layout.state.pageLeft,
                transition: "all 500ms linear",
                background: "blue"
              }}
            >
              <Sidebar>
                <Details
                  width={sidebars.details.width}
                  isOpen={isOpen(layout.state.leftSidebar, "details")}
                  left={layout.state.leftSidebar.left}
                />
              </Sidebar>

              <button
                onClick={() => layout.toggleMenu(!layout.state.isMenuOpen)}
              >
                {layout.state.isMenuOpen ? "Close menu" : "Open menu"}
              </button>
              <button
                onClick={() =>
                  layout.toggleLeftSidebar(
                    "details",
                    !isOpen(layout.state.leftSidebar, "details")
                  )
                }
              >
                {isOpen(layout.state.leftSidebar, "details")
                  ? "Close details"
                  : "Open details"}
              </button>
              <button
                onClick={() =>
                  layout.toggleRightSidebar(
                    "profile",
                    !isOpen(layout.state.rightSidebar, "profile")
                  )
                }
              >
                {isOpen(layout.state.rightSidebar, "profile")
                  ? "Close profile"
                  : "Open profile"}
              </button>
            </div>
          </div>
        </>
      )}
    </Subscribe>
  );
}

const isOpen = (
  sidebarState: {
    key: string | null;
    isOpen: boolean;
    right?: number;
    left?: number;
  },
  key: string
) => sidebarState.key === key && sidebarState.isOpen;

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
