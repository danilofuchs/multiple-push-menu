import * as React from "react";
import { Container } from "unstated";
import { menuConfig, sidebarsConfig } from "./SidebarConfig";

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
    if (sidebarsConfig.hasOwnProperty(key)) {
      this.closeRight();
      const sidebarConfig = sidebarsConfig[key];
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
        `Invalid key ${key}. Available: ${Object.keys(
          sidebarsConfig
        ).toString()}`
      );
    }
  }

  toggleRightSidebar(key: string, newState: boolean) {
    if (sidebarsConfig.hasOwnProperty(key)) {
      this.closeLeft();
      this.toggleMenu(false);
      const sidebarConfig = sidebarsConfig[key];
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
        `Invalid key ${key}. Available: ${Object.keys(
          sidebarsConfig
        ).toString()}`
      );
    }
  }

  private closeLeft() {
    if (
      this.state.leftSidebar.key &&
      sidebarsConfig[this.state.leftSidebar.key] &&
      this.state.leftSidebar.isOpen === true
    ) {
      this.toggleLeftSidebar(this.state.leftSidebar.key, false);
    }
  }
  private closeRight() {
    if (
      this.state.rightSidebar.key &&
      sidebarsConfig[this.state.rightSidebar.key] &&
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

const isOpen = (
  sidebarState: {
    key: string | null;
    isOpen: boolean;
    right?: number;
    left?: number;
  },
  key: string
) => sidebarState.key === key && sidebarState.isOpen;

export { isOpen };
export default LayoutContainer;
