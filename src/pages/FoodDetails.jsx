import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error("Error fetching food details:", err));
  }, [id]);

  const handleRequestFood = () => {
    if (!user) return alert(" Please login to request food");
    alert(` You have successfully requested ${food.food_name}`);
  };

  if (!food)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="hero bg-gradient-to-r from-orange-50 to-pink-50 min-h-screen py-12">
      <div className="hero-content flex-col lg:flex-row gap-12 max-w-6xl">
        {/* Left Side — Food Image */}
        <img
          src={food.food_image}
          alt={food.food_name}
          className="max-w-sm w-full rounded-2xl shadow-2xl object-cover"
        />

        {/* Right Side — Food Info */}
        <div className="space-y-4 text-gray-700">
          <h1 className="text-4xl font-bold text-gray-900">{food.food_name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <p>
              <span className="font-semibold">🍽 Quantity:</span> {food.food_quantity}
            </p>
            <p>
              <span className="font-semibold">📍 Pickup:</span> {food.pickup_location}
            </p>
            <p>
              <span className="font-semibold">🕓 Expire Date:</span> {food.expire_date}
            </p>
            <p>
              <span className="font-semibold">🧑 Donator:</span> {food.donator_name}
            </p>
          </div>

          {food.additional_notes && (
            <p className="pt-2">
              <span className="font-semibold">📝 Notes:</span> {food.additional_notes}
            </p>
          )}

          {/* Request Button */}
          <button
            onClick={handleRequestFood}
            className="btn bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold mt-6"
          >
            Request This Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
