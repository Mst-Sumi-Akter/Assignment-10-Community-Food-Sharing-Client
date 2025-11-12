import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [id]);

  const requestFood = () => {
    if (!user) return alert("Please login to request food");
    alert(`Requested ${food.food_name} successfully!`);
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div>
      <h1>{food.food_name}</h1>
      <img src={food.food_image} alt={food.food_name} width={300} />
      <p>Quantity: {food.food_quantity}</p>
      <p>Pickup: {food.pickup_location}</p>
      <p>Expire Date: {food.expire_date}</p>
      <p>Donator: {food.donator_name}</p>
      <p>Notes: {food.additional_notes}</p>
      <button onClick={requestFood}>Request Food</button>
    </div>
  );
};

export default FoodDetails;
