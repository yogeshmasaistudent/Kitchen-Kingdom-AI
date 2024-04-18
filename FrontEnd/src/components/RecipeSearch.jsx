import { Button } from "antd";
import React, { useState } from "react";
import Navbar from "./Navbar";


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
    <>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.title}>Cook What You Want With Kitchen-Kingdom-AI</h1>
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
          <div className="card-container" style={styles.cardContainer}>
            <div className="card" style={styles.card}>
              <h3 style={styles.cardTitle}>Ingredients:</h3>
              <ul style={styles.list}>
                {recipeData.data["Ingredients:"].map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={styles.card}>
              <h3 style={styles.cardTitle}>Instructions:</h3>
              <ul style={styles.list}>
                {recipeData.data["Instructions:"].map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={styles.card}>
              <h3 style={styles.cardTitle}>Extra Add-Ons:</h3>
              <ul style={styles.list}>
                {recipeData.data["Extra Add-Ons:"].map((addOn, index) => (
                  <li key={index}>{addOn}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <Button>Save</Button>
      </div>

      <div className="cooking">
        
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1500px",
    marginBottom: "10px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "10px",
    background: "#FFFFFF",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "30px",
    color: "gold",
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
    backgroundColor: "#ffc100",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: {
    color: "gold",
    marginBottom: "15px",
  },
  list: {
    paddingInlineStart: "20px",
  },
};

// Hover styles
styles.cardHover = {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
};

styles.cardHoverH3 = {
  color: "#ff6347",
};

export default RecipeSearch;
