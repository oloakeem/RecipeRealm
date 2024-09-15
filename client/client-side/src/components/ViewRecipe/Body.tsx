import styles from "./Body.module.css";
import { useEffect, useState } from "react";
import mydish from "../../assets/dish-svgrepo-com.svg";
import { Link } from "react-router-dom";
import myarrow from "../../assets/Arrow-Left.svg";
import myplus from "../../assets/plus-sign.svg";

interface FoodItem {
  _id: string;
  dishName: string;
  imageUrl: string;
}

const Body = () => {
  const [search, setSearch] = useState("");
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [filteredFoodList, setFilteredFoodList] = useState<FoodItem[]>([]);
  const isAdmin = sessionStorage.getItem("isAdmin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes");

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
      <div className={styles.viewBodyBackground}>
        <div className={styles["top-head"]}>
          <button
            className={styles["return-button"]}
            onClick={() => window.history.back()}
          >
            <img src={myarrow} alt="" />
          </button>
          <h2 className={styles["search-title"]}>Recipe Catalog</h2>

          {isAdmin && (
            <Link to="/add-recipe">
              <button className={styles["add-button"]}>
                <img src={myplus} alt="" />
              </button>
            </Link>
          )}
        </div>

        <div className={styles["search-container"]}>
          <form
            className={styles["searchBar"]}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="Search..."
              value={search}
            />
          </form>
        </div>

        <div className={styles.foodContainer}>
          <div className={styles["food-list"]}>
            {filteredFoodList.map((food) => (
              <div key={food._id} className={styles["food-item"]}>
                <div className={styles["food-image"]}>
                  <img src={food.imageUrl || mydish} alt={food.dishName} />
                </div>

                <div className={styles["food-details"]}>
                  <Link to={`/view-specific-recipe/${food._id}`}>
                    {food.dishName}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
