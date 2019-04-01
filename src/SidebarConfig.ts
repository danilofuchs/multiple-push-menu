export interface SidebarConfig {
  width: number;
  position: "left" | "right";
}
export interface SidebarConfigs {
  [x: string]: SidebarConfig;
}
export const sidebarsConfig: SidebarConfigs = {
  details: {
    width: 100,
    position: "left"
  },
  profile: {
    width: 150,
    position: "right"
  }
};

export const menuConfig: SidebarConfig = {
  width: 300,
  position: "left"
};
