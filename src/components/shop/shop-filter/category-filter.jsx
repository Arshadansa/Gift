import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ErrorMsg from "@/components/common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";

const CategoryFilter = ({ setCurrPage }) => {
  const { data: categories = [], isLoading, isError, error } = useGetShowCategoryQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered category

  // Handle category route
  const handleCategoryRoute = (id, name) => {
    setCurrPage(1); // Reset the current page
    // Navigate to the shop page with selected category ID and name
    router.push(`/shop?category=${id}&name=${encodeURIComponent(name)}`);
    dispatch(handleFilterSidebarClose());
  };

  // Render content based on loading/error state
  let content;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  } else if (isError) {
    console.error("Error loading categories:", error); // Log the error to the console
    content = <ErrorMsg msg="There was an error loading categories." />;
  } else if (!categories || categories.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  } else {
    content = categories.map((item) => {
      const isActive = router.query.category === item.id.toString();
      const isHovered = hoveredCategory === item.id;

      return (
        <li
          key={item.id}
          style={{
            listStyleType: "none", // Hide bullet points
            marginBottom: "3px", // Add spacing between list items
            borderRadius: "4px",
            backgroundColor: isActive || isHovered ? "#990100" : "transparent", // Apply hover or active background
            padding: "4px 4px", // Add padding to list items
          }}
        >
          <a
            onClick={() => handleCategoryRoute(item.id, item.name)} // Navigate with category ID and name
            onMouseEnter={() => setHoveredCategory(item.id)} // Track hovered category
            onMouseLeave={() => setHoveredCategory(null)} // Remove hover state when mouse leaves
            style={{
              cursor: "pointer",
              color: isActive || isHovered ? "#fff" : "#000", // Apply hover or active text color
              textDecoration: "none", // Remove underline from links
              display: "block", // Ensure the entire li is clickable
            }}
          >
            {item.name} <span>({item.products_count})</span>
          </a>
        </li>
      );
    });
  }

  // Check for selected category products
  const selectedCategoryId = router.query.category;
  const selectedCategory = categories.length > 0 
    ? categories.find(cat => cat.id.toString() === selectedCategoryId) 
    : null;

  const hasProducts = selectedCategory && selectedCategory.products_count > 0;

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Categories</h3>
      <div className="tp-shop-widget-content">
        <div>
          <ul
            style={{
              textTransform: "uppercase",
              padding: "0", 
              margin: "0",  // Remove default margin from ul
            }}
          >
            {content}
          </ul>
        </div>
        {/* Display message if the selected category has no products */}
        {selectedCategoryId && !hasProducts && (
          <ErrorMsg msg="This category has no products available." />
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
