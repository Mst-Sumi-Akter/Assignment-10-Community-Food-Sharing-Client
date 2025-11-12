import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/foods") // replace with your backend
      .then((res) => res.json())
      .then((data) => setFoods(data.slice(0, 6))); // featured 6 foods
  }, []);

  return (
    <div>
      <h1>Welcome to PlateShare</h1>
      <div className="food-grid">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Home;
