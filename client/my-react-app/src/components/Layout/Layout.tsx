import React from "react";
import BottomNavbar from "../BottomNavBar/BottomNavBar";
import styles from "./Layout.module.css";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={styles["layoutStyle"]}>
      <div>{children}</div>
      <BottomNavbar />
    </div>
  );
};

export default Layout;
