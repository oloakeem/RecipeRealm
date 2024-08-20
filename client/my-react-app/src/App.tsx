import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Landing/Home";
import Layout from "./components/Layout/Layout";
import Body from "./components/ViewRecipe/Body";
import RecipeForm from "./components/PostRecipe/RecipeForm";
import Recipe from "./components/ViewSpecific/Recipe";
function App() {
  return (
    //<RecipeForm></RecipeForm>

    <Router>
      <Routes>
        {/* Page without Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/view-specific-recipe/:id" element={<Recipe />} />

        {/* All other pages with Layout */}
        <Route
          path="/view-recipe"
          element={
            <Layout>
              <Body />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
