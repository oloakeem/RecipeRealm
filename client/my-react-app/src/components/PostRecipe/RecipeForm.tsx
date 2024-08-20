import styles from "./RecipeForm.module.css";
import { useState } from "react";

const RecipeForm = () => {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      dishName,
      ingredients,
      directions,
      prepTime,
      totalTime,
    };

    try {
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
      setIngredients("");
      setDirections("");
      setPrepTime("");
      setTotalTime("");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe");
    }
  };

  return (
    <div className={styles["formContainer"]}>
      <button className={styles.closeButton}>X</button>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["formGroup"]}>
          <label htmlFor="dishName">Dish Name</label>
          <input
            type="text"
            id="dishName"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            id="ingredients"
            value={ingredients} // Assuming ingredients are input as a newline-separated string
            onChange={(e) => setIngredients(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="directions">Directions/Steps</label>
          <textarea
            id="directions"
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            rows={6}
            required
          ></textarea>
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="prepTime">Prep Time (e.g., 15 minutes)</label>
          <input
            type="text"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="totalTime">
            Total Time (e.g., 1 hour 30 minutes)
          </label>
          <input
            type="text"
            id="totalTime"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default RecipeForm;
