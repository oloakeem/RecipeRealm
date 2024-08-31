import styles from "./RecipeForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [dishName, setDishName] = useState("");
  const [direction, setDirection] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [directions, setDirections] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [image, setImage] = useState<File | null>(null); // State for the image file
  const isAdmin = sessionStorage.getItem("isAdmin");
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  };

  const handleAddDirection = () => {
    if (direction.trim()) {
      setDirections([...directions, direction]);
      setDirection("");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("dishName", dishName);
    formData.append("author", author);
    formData.append("servingSize", servingSize);
    formData.append("prepTime", prepTime);
    formData.append("totalTime", totalTime);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("directions", JSON.stringify(directions));

    if (image) {
      console.log(image);
      formData.append("image", image); // Append the image file
    }

    try {
      if (isAdmin) {
        const response = await fetch("http://localhost:5000/api/recipes", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error details:", errorData);
          throw new Error("Network response was not ok");
        }

        await response.json();
        alert("Recipe submitted successfully!");
        setDishName("");
        setIngredient("");
        setDirection("");
        setAuthor("");
        setServingSize("");
        setPrepTime("");
        setTotalTime("");
        setImage(null);
      } else {
        alert("You are not authorized to submit recipes.");
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe");
    }
  };

  return (
    <div className={styles["formContainer"]}>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h1>New Recipe</h1>
        <div className={styles["formGroup"]}>
          <label htmlFor="dishName">Name</label>
          <input
            placeholder="(e.g., Rigatoni)"
            type="text"
            id="dishName"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </div>

        {/* Ingredients Section */}
        <div className={`${styles.formGroup} ${styles.ingredients}`}>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            id="ingredients"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="(e.g., Basil, 2 Bunches)"
          />
          <button
            id={styles.addIngredients}
            type="button"
            onClick={handleAddIngredient}
          >
            Add More
          </button>
        </div>
        <div className={`${styles["formGroup"]} ${styles.overLappingBox}`}>
          <div className={styles.itemListView}>
            <h6>Ingredients List:</h6>
            <ul>
              {ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Directions Section */}
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
        <div className={`${styles["formGroup"]} ${styles.overLappingBox}`}>
          <div className={styles.itemListView}>
            <h6>Directions List:</h6>
            <ol>
              {directions.map((dir, index) => (
                <li key={index}>{dir}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className={styles["formGroup"]}>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Other Fields */}
        <div className={styles["formGroup"]}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Chef's Name"
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
            placeholder="(e.g., 4 servings)"
            required
          />
        </div>
        <div className={styles["formGroup"]}>
          <label htmlFor="prepTime">Prep Time</label>
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

        {/* Submit and Cancel Buttons */}
        <div id={styles.submitBtnGroup} className={styles["formGroup"]}>
          <button id={styles.closeButton} onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className={`${styles["formGroup"]} ${styles["right-half"]}`}>
        <div>
          <h3>Ingredients List:</h3>
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Directions List:</h3>
          <ol>
            {directions.map((dir, index) => (
              <li key={index}>{dir}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
