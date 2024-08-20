import myKitchen from "../../assets/cookbook.png";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles["welcome-page"]}>
      <img id="kImage" src={myKitchen} alt="Cant display" />
      <Link to="/view-recipe" className={styles["homeBtn"]}>
        Click me!
      </Link>
    </div>
  );
};

export default Home;
