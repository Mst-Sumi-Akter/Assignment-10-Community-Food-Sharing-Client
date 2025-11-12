import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AddFood = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      donator_name: user.displayName,
      donator_email: user.email,
      donator_image: user.photoURL,
      food_status: "Available",
    };

    fetch("http://localhost:5000/add-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => alert("Food added successfully!"));
  };

  return (
    <div>
      <h1>Add Food</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="food_name"
          placeholder="Food Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="food_image"
          placeholder="Food Image URL"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="food_quantity"
          placeholder="Quantity (e.g., Serves 3)"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickup_location"
          placeholder="Pickup Location"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expire_date"
          onChange={handleChange}
          required
        />
        <textarea
          name="additional_notes"
          placeholder="Additional Notes"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
