import * as React from "react";
import { render } from "react-dom";
import { Provider, Subscribe } from "unstated";
import LayoutContainer, { isOpen } from "./LayoutContainer";
import { menuConfig, sidebarsConfig } from "./SidebarConfig";

import Sidebar from "./Sidebar";
import Menu from "./Menu";
import Details from "./Details";
import Profile from "./Profile";

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
                onClose={() => layout.toggleMenu(false)}
              />
            </Sidebar>
            <Sidebar>
              <Profile
                width={sidebarsConfig.profile.width}
                isOpen={isOpen(layout.state.rightSidebar, "profile")}
                right={layout.state.rightSidebar.right}
                onClose={() => layout.toggleRightSidebar("profile", false)}
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
                  width={sidebarsConfig.details.width}
                  isOpen={isOpen(layout.state.leftSidebar, "details")}
                  left={layout.state.leftSidebar.left}
                  onClose={() => layout.toggleLeftSidebar("details", false)}
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

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
