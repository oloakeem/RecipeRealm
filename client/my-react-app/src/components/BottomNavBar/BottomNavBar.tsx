import styles from "./BottomNavBar.module.css";

const BottomNavBar = () => {
  return (
    <nav className={styles["bottomNavBar"]}>
      <a href="/home">Home</a>
      <a href="/search">Search</a>
      <a href="/profile">Profile</a>
    </nav>
  );
};

export default BottomNavBar;
