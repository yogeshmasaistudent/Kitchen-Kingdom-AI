import React, { useState } from "react";

function RecipeSearch() {
  const [dishName, setDishName] = useState("");
  const [recipeData, setRecipeData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch("https://kitchen-kingdom-ai.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dish: dishName }),
      });
      const data = await response.json();
      setRecipeData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Recipe</h1>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter dish name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>
      {recipeData && (
        <div style={styles.recipeDetails}>
          <h2 style={styles.heading}>{recipeData.msg}</h2>
          <div>
            <h3 style={{ color: "red" }}>Ingredients:</h3>
            <ul>
              {recipeData.data["Ingredients:"].map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: "red" }}>Instructions:</h3>
            <ol>
              {recipeData.data["Instructions:"].map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 style={{ color: "red" }}>Extra Add-Ons:</h3>
            <ul>
              {recipeData.data["Extra Add-Ons:"].map((addOn, index) => (
                <li key={index}>{addOn}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "10px",
    background: "linear-gradient(to bottom, #ffecd2, #fcb69f)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "30px",
    color: "#333",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  input: {
    width: "calc(100% - 100px)",
    padding: "12px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px 30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  recipeDetails: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    border:"2px solid red"
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
};

export default RecipeSearch;
