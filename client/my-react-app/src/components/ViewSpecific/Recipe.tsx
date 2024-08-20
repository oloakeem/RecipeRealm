import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface FoodItem {
  _id: string;
  dishName: string;
  ingredients: string;
  directions: string;
  prepTime: string;
  totalTime: string;
}
const Recipe = () => {
  const { id } = useParams<{ id: string }>(); // Get the recipe ID from the URL

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
    <>
      <div className="imageSection">
        <img src="" alt="" />
        <div className="ingredientSection">
          <h2>{foodRecipe.ingredients}</h2>
        </div>
      </div>

      <div className="directionSection">
        <h2>Direction</h2>
        <ul></ul>
      </div>

      <div className="authorSection">
        <h2>Author</h2>
        <ol></ol>
      </div>
    </>
  );
};
export default Recipe;
