import React, { useState } from "react";

function RecipeSearch() {
  const [dishName, setDishName] = useState("");
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText,SetRecipeText] = useState("");
function parseRecipe(recipeText) {
  let recipe = {
    ingredients: [],
    instructions: [],
    extraAddOns: [],
  };

  // Function to extract sections based on pattern and start delimiter
  function extractSection(text, pattern, startDelimiter) {
    let sections = [];
    let regex = new RegExp(pattern, "g");
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      let sectionName = match[1];
      let sectionStartIndex = match.index + match[0].length;
      let sectionEndIndex = text.indexOf(startDelimiter, sectionStartIndex);

      if (sectionEndIndex === -1) {
        sectionEndIndex = text.length;
      }

      let sectionContent = text
        .substring(sectionStartIndex, sectionEndIndex)
        .trim();
      sections.push({ name: sectionName, content: sectionContent });

      lastIndex = sectionEndIndex;
    }

    return sections;
  }

  // Extract ingredients
  let ingredientSections = extractSection(recipeText, "\\* (.+?):", "\\*");
  recipe.ingredients = ingredientSections.map((section) =>
    section.content.replace(/\*/g, "").replace(/\n/g, "").trim()
  );

  // Extract instructions
  let instructionSections = extractSection(
    recipeText,
    "To make the (.+?):",
    "To make the"
  );
  recipe.instructions = instructionSections.map((section) =>
    section.content.replace(/\*/g, "").replace(/\n/g, "").trim()
  );

  // Extract extra add-ons
  let extraAddOnSections = extractSection(recipeText, "\\* (.+?):", "\\*");
  recipe.extraAddOns = extraAddOnSections.map((section) =>
    section.content.replace(/\*/g, "").replace(/\n/g, "").trim()
  );

  return recipe;
}

// Example usage

console.log(parseRecipe(recipeText));





  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dish: dishName }),
      });
      const data = await response.json();
      setRecipeData(SetRecipeText(data.recipeText));
      console.log(recipeData);
      console.log(data)
     
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
          <h2 style={styles.heading}>{recipeData.message}</h2>
          <p>
            <strong>Dish:</strong> {recipeData.dish}
          </p>
          <p>
            <strong>Recipe:</strong>
          </p>
          <pre style={styles.recipeText}>
            {recipeData.recipeText.split(/\n(?=\{2,} [A-Za-z ]+:)/)}
            {console.log(
              recipeData.recipeText.split(/\n(?=\{2,} [A-Za-z ]+:)/)
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
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
  },
  heading: {
    color: "#333",
    marginBottom: "15px",
  },
  recipeText: {
    whiteSpace: "pre-wrap",
  },
};

export default RecipeSearch;
