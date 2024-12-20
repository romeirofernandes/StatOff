import React from "react";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Category from "./components/Category";
import Goals from "./components/Goals";
import Assists from "./components/Assists";
import Appearances from "./components/Appearances";
import Result from "./components/Result";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/category" element={<Category />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/assists" element={<Assists />} />
          <Route path="/appearances" element={<Appearances />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
