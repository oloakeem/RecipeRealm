import myKitchen from "../../assets/cookbook.png";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles["welcome-page"]}>
      <div className={styles["home-components"]}>
        <div className={styles["home-heading"]}>
          <h1>Cook like a Chef</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
            eligendi iure modi quidem eum tempora incidunt ab enim quam
            sapiente.
          </p>
        </div>
        <Link to="/view-recipe" className={styles["homeBtn"]}>
          View as Guest
        </Link>
        <Link to="/verify-admin" className={styles["homeBtn"]}>
          Login as Admin
        </Link>
      </div>
    </div>
  );
};

export default Home;
