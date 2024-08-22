import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Landing/Home";
import Body from "./components/ViewRecipe/Body";
import RecipeForm from "./components/PostRecipe/RecipeForm";
import Recipe from "./components/ViewSpecific/Recipe";
import AdminLogin from "./components/Login/AdminLogin";
function App() {
  return (
    <Router>
      <Routes>
        {/* Page without Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/view-specific-recipe/:id" element={<Recipe />} />
        <Route path="/view-recipe" element={<Body />} />
        <Route path="/verify-admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
