import myKitchen from "../../assets/cookbook.png";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles["welcome-page"]}>
      <img id="kImage" src={myKitchen} alt="Cant display" />
      <Link to="/view-recipe" className={styles["homeBtn"]}>
        View as Guest
      </Link>
      <Link to="/verify-admin" className={styles["homeBtn"]}>
        Login as Admin
      </Link>
    </div>
  );
};

export default Home;
