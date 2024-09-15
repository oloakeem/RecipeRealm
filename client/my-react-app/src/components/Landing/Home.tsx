import myKitchen from "../../assets/home-landing-mobile.jpg";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles["welcome-page"]}>
      <div className={styles["home-components"]}>
        <div className={styles["home-heading"]}>
          <h1>Delicious Recipes Hub</h1>
          <p>
            Discover and share delicious recipes from around the world at
            Delicious Recipes Hub. From classic comfort foods to exciting new
            dishes, find inspiration and join our community of food lovers.
            Happy cooking!
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
