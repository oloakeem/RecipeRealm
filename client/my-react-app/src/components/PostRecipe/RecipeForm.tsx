import styles from "./RecipeForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [dishName, setDishName] = useState("");
  // State for the ingredient input field
  const [direction, setDirection] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  // State for the list of ingredients & directions
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);

  const [author, setAuthor] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const isAdmin = sessionStorage.getItem("isAdmin");
  const navigate = useNavigate();

  // Add an ingredient to the list
  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient(""); // Clear the input field after adding
    }
  };
  const handleAddDirection = () => {
    if (direction.trim()) {
      setDirections([...directions, direction]);
      setDirection(""); // Clear the input field after adding
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      dishName,
      ingredients,
      directions,
      author,
      servingSize,
      prepTime,
      totalTime,
    };
    try {
      if (isAdmin) {
        // Post form data to the server

        const response = await fetch("http://localhost:3000/api/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.log(formData);
          throw new Error("Network response was not ok");
        }

        await response.json();
        alert("Recipe submitted successfully!");
        // Reset form fields after submission
        setDishName("");
        setIngredient("");
        setDirection("");
        setAuthor("");
        setServingSize("");
        setPrepTime("");
        setTotalTime("");
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe");
    }
  };

  return (
    <div className={styles["formContainer"]}>
      <h1>New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["formGroup"]}>
          <label htmlFor="dishName">Name</label>
          <input
            placeholder="(e.g.,Rigatoni)"
            type="text"
            id="dishName"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </div>
        {/* Controls Ingredients Section on forms  */}
        <div className={`${styles.formGroup} ${styles.ingredients}`}>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            id="ingredients"
            value={ingredient} // Assuming ingredients are input as a newline-separated string
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="(e.g., Basil, 2 Bunches)"
          ></input>
          <button
            id={styles.addIngredients}
            type="button"
            onClick={handleAddIngredient}
          >
            Add More
          </button>
        </div>
        <div className={styles["formGroup"]}>
          <h6>Ingredients List:</h6>
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
        {/* Controls Directions Section on forms  */}

        <div className={styles["formGroup"]}>
          <label htmlFor="directions">Directions/Steps</label>
          <textarea
            id="directions"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            placeholder="(e.g., Preheat the oven to 375°F (190°C). Line a baking sheet with parchment paper.)"
            rows={6}
            required
          ></textarea>
          <button type="button" onClick={handleAddDirection}>
            Add Steps
          </button>
        </div>
        <div className={styles["formGroup"]}>
          <h6>Directions:</h6>
          <ol>
            {directions.map((dir, index) => (
              <li key={index}>{dir}</li>
            ))}
          </ol>
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Chefs Name"
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="servingSize">Serving Size</label>
          <input
            type="text"
            id="servingSize"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            placeholder="(e.g., 1ls, 4 servings)"
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="prepTime">Prep Time </label>
          <input
            type="text"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="(e.g., 15 minutes)"
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="totalTime">Total Time</label>
          <input
            type="text"
            id="totalTime"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            placeholder="(e.g., 1 hour 30 minutes)"
            required
          />
        </div>
        <div id={styles.submitBtn} className={styles["formGroup"]}>
          <button id={styles.closeButton} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default RecipeForm;
