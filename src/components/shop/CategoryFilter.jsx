import React from "react";

const CategoryFilter = ({ categories, handleCategoryChange }) => {
  return (
    <div style={{ marginBottom: "15px" }} className="category-filter">
      <h4>Filter by Categories</h4>
      <select
        style={{ padding: "10px", width: "200px" }}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}> {/* Use category.id for key and category.name for value */}
            {category.name} {/* Access the name property */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
