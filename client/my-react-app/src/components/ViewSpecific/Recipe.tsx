import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Recipe.module.css";
import avatar from "../../assets/avatar-profile-svgrepo-com.svg";
import dishTray from "../../assets/dish-tray-svgrepo-com.svg";
import myClock from "../../assets/clock-circle-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import myKitchen from "../../assets/cookbook.png";

interface FoodItem {
  _id: string;
  dishName: string;
  ingredients: Array<string>;
  directions: Array<string>;
  author: string;
  servingSize: string;
  prepTime: string;
  totalTime: string;
}
const Recipe = () => {
  const { id } = useParams<{ id: string }>(); // Get the recipe ID from the URL

  const navigate = useNavigate();

  const [foodRecipe, setFoodRecipe] = useState<FoodItem | null>(null); // Single FoodItem or null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: FoodItem = await response.json();
        setFoodRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe", error);
      }
    };
    fetchData();
  }, [id]);
  if (!foodRecipe) {
    return <div>Loading...</div>; // Handle loading state
  }
  return (
    <div className={styles["view-specific-page"]}>
      <div className={styles["specific-image"]}>
        <img src={myKitchen} alt="" />
      </div>
      <h1 className={styles.headerName}>{foodRecipe.dishName}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis quam non
        ut ratione temporibus unde ipsum excepturi repudiandae officiis,
        aspernatur deleniti pariatur ad at magni.
      </p>
      <div className={styles.lineBreak}></div>
      <div className={styles.microInfo}>
        <div className={styles.microInfoBody}>
          <div>
            <h6>AUTHOR</h6>
            {foodRecipe.author}
          </div>
          <div>
            <h6>SERVING SIZE</h6>
            {foodRecipe.servingSize}
          </div>
          <div>
            <h6>PREP TIME</h6>
            {foodRecipe.prepTime}
          </div>
          <div>
            <h6>TOTAL TIME</h6>
            {foodRecipe.totalTime}
          </div>
        </div>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles["ingredientSection"]}>
        <h2>Ingredients</h2>
        <ul>
          {foodRecipe.ingredients.map((items) => (
            <li>{items}</li>
          ))}
        </ul>
      </div>
      <div className={styles.lineBreak}></div>
      <div className={styles["directionSection"]}>
        <h2>Direction</h2>
        <ol>
          {foodRecipe.directions.map((items) => (
            <li>{items}</li>
          ))}
        </ol>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};
export default Recipe;
