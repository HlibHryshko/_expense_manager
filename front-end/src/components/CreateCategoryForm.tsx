// src/components/CreateCategoryForm.tsx
import React, { useState } from "react";
import { createCategory } from "../store/slices/categoriesSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const CreateCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (categoryName.trim() === "") {
      alert("Category name is required");
      return;
    }

    // Dispatch the createCategory action with the category name
    dispatch(createCategory({ name: categoryName, icon: "icon" }));

    // Reset the form input
    setCategoryName("");
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 mr-4"
          placeholder="Enter new category"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
