import styles from "./Body.module.css";
import { useEffect, useState } from "react";
import myImage from "../../assets/Arrow-Left.svg";
import myplus from "../../assets/plus-sign.svg";
import { Link } from "react-router-dom";

interface FoodItem {
  _id: string;
  dishName: string;
}
const Body = () => {
  const [search, setSearch] = useState("");
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [filteredFoodList, setFilteredFoodList] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: FoodItem[] = await response.json();
        setFoodList(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = foodList.filter((food) =>
      food.dishName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFoodList(filtered);
  }, [search, foodList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className={styles["top-head"]}>
        <button>
          <img
            className={styles["arrow-button"]}
            src={myImage}
            alt="arrow-button"
          />
        </button>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search..."
            value={search} // Ensures the input reflects the current search state
          />
        </form>
        <Link to="/add-recipe">
          <img
            className={styles["arrow-button"]}
            src={myplus}
            alt="arrow-button"
          />
        </Link>
      </div>

      <div className={styles["food-list"]}>
        {filteredFoodList.map((food) => (
          <div key={food._id} className={styles["food-item"]}>
            <Link to={`/view-specific-recipe/${food._id}`}>
              {food.dishName}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Body;
