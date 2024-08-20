import styles from "./FirstNav.module.css";
import myImage from "../../assets/Arrow-Left.svg";
import myplus from "../../assets/plus-sign.svg";
import { Link } from "react-router-dom";
const FirstNav = () => {
  return (
    <div className={styles["top-head"]}>
      <button>
        <img
          className={styles["arrow-button"]}
          src={myImage}
          alt="arrow-button"
        />
      </button>
      <form>
        <input type="text" placeholder="Search..." />
        <button type="submit" style={{ padding: "10px", borderRadius: "5px" }}>
          Search
        </button>
      </form>
      <Link to="/add-recipe">
        <img
          className={styles["arrow-button"]}
          src={myplus}
          alt="arrow-button"
        />
      </Link>
    </div>
  );
};

export default FirstNav;
