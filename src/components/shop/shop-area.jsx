import React, { useEffect, useState } from "react";
import Pagination from "@/ui/Pagination";
import ProductItem from "../products/fashion/product-item";
import StatusFilter from "./shop-filter/status-filter";
import ResetButton from "./shop-filter/reset-button";
import { useRouter } from "next/router";
import ShopTopLeft from "./shop-top-left";
import ShopTopRight from "./shop-top-right";
import ShopListItem from "./shop-list-item";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";


const getUniqueCategories = (products) => {
  const allCategories = products.reduce((acc, product) => {
    product.categories.forEach((category) => {
      if (!acc.includes(category)) acc.push(category);
    });
    return acc;
  }, []);
  return allCategories;
};

const CategoryFilter = ({ handleCategoryChange }) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter(); 
  
  // Handle category route
  const handleCategoryRoute = (name) => {
    router.push(
      `/shop?category=${name.toLowerCase().replace("&", "").split(" ").join("-")}`
    );
  };

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    handleCategoryChange(selectedCategory);
    if (selectedCategory) {
      handleCategoryRoute(selectedCategory); // Navigate when a category is selected
    } else {
      handleCategoryRouteShop(); // Navigate to shop when 'All Categories' is selected
    }
  };

  const handleCategoryRouteShop = () => {
    router.push("/shop");
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories.</p>;

  return (
    <div style={{ marginBottom: "15px" }} className="category-filter">
      <h4>Filter by Categories</h4>
      <select style={{ padding: "10px", width: "200px" }} onChange={handleChange} defaultValue="">
        <option value="">All Categories</option>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name} <span>({category.products_count})</span>
            </option>
          ))
        ) : (
          <option disabled>No Categories Available</option>
        )}
      </select>
    </div>
  );
};
const ShopArea = ({ all_products, products, otherProps }) => {
  const { priceFilterValues, selectHandleFilter, currPage, setCurrPage } = otherProps;
  const [filteredRows, setFilteredRows] = useState(products);
  const [pageStart, setPageStart] = useState(0);
  const [countOfPage, setCountOfPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const router = useRouter();

  // Get unique categories from all_products
  const allCategories = getUniqueCategories(all_products);

  const paginatedData = (items, startPage, pageCount) => {
    setFilteredRows(items);
    setPageStart(startPage);
    setCountOfPage(pageCount);
  };

  // Function to handle sorting
  const sortProducts = (productsToSort) => {
    let sortedProducts = [...productsToSort];

    switch (sortOption) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (no sorting applied)
        sortedProducts = productsToSort;
        break;
    }

    return sortedProducts;
  };

  // Effect to filter and sort products
  useEffect(() => {
    let filtered = all_products;

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.categories.includes(selectedCategory)
      );
    }

    // Filter by status from query (if any)
    if (router.query.status) {
      const statuses = router.query.status.split(",");
      if (statuses.includes("on-sale")) {
        filtered = filtered.filter((product) => product.isOnSale);
      }
      if (statuses.includes("in-stock")) {
        filtered = filtered.filter((product) => product.isInStock);
      }
    }

    // Sort filtered products
    const sortedProducts = sortProducts(filtered);

    setFilteredRows(sortedProducts);
  }, [selectedCategory, sortOption, router.query.status, all_products]);

  return (
    <>
      <section className="tp-shop-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="tp-shop-sidebar mr-10">
                {/* Status Filter */}
                <StatusFilter setCurrPage={setCurrPage} />

                {/* Category Filter */}
                <CategoryFilter
                  handleCategoryChange={setSelectedCategory}
                />

                {/* Reset Button */}
                <ResetButton />
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="tp-shop-main-wrapper">
                <div className="tp-shop-top mb-45">
                  <div className="row">
                    <div className="col-xl-6">
                      <ShopTopLeft
                        showing={
                          products.length === 0
                            ? 0
                            : filteredRows.slice(pageStart, pageStart + countOfPage).length
                        }
                        total={all_products.length}
                      />
                    </div>
                    <div className="col-xl-6">
                      <ShopTopRight
                        selectHandleFilter={selectHandleFilter}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                      />
                    </div>
                  </div>
                </div>

                {/* Products Grid/List */}
                {products.length === 0 && <h2>No products found</h2>}
                {products.length > 0 && (
                  <div className="tp-shop-items-wrapper tp-shop-item-primary">
                    <div className="tab-content" id="productTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="grid-tab-pane"
                        role="tabpanel"
                        aria-labelledby="grid-tab"
                        tabIndex="0"
                      >
                        <div className="row">
                          {filteredRows
                            .slice(pageStart, pageStart + countOfPage)
                            .map((item) => (
                              <div key={item._id} className="col-xl-4 col-md-6 col-sm-6">
                                <ProductItem product={item} />
                              </div>
                            ))}
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="list-tab-pane"
                        role="tabpanel"
                        aria-labelledby="list-tab"
                        tabIndex="0"
                      >
                        <div className="tp-shop-list-wrapper tp-shop-item-primary mb-70">
                          <div className="row">
                            <div className="col-xl-12">
                              {filteredRows
                                .slice(pageStart, pageStart + countOfPage)
                                .map((item, key) => (
                                  <ShopListItem product={item} key={key} />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {products.length > 0 && (
                  <div className="tp-shop-pagination mt-20">
                    <div className="tp-pagination">
                      <Pagination
                        items={products}
                        countOfPage={countOfPage}
                        paginatedData={paginatedData}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopArea;
