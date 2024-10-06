import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
} from "@/redux/features/productApi";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import ErrorMsg from "@/components/common/error-msg";

const ShopPage = ({ query }) => {
  const [categoryId, setCategoryId] = useState(query?.category || null);

  const [currPage, setCurrPage] = useState(1);

  const {
    data: allProducts,
    isError: isProductsError,
    isLoading: isProductsLoading,
  } = useGetAllProductsQuery();

  const {
    data: categoryProducts = [],
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetProductTypeQuery(categoryId, { skip: !categoryId });

  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");

  // Reset category filter
  const resetCategory = () => {
    setCategoryId(null); // Clear category ID
    setCurrPage(1); // Reset to the first page
  };

  useEffect(() => {
    if (!isProductsLoading && allProducts?.data) {
      const maxPrice = Math.max(...allProducts.data.map((p) => p.price), 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isProductsLoading, allProducts]);

  useEffect(() => {
    if (query?.category) {
      setCategoryId(query.category);
    }
  }, [query?.category]);

  let product_items = categoryId ? categoryProducts : allProducts?.data || [];

  if (isCategoryLoading || isProductsLoading) {
    return <ShopLoader loading={isCategoryLoading || isProductsLoading} />;
  } else if (isCategoryError || isProductsError) {
    return <ErrorMsg msg="Error loading products." />;
  } else if (product_items.length === 0) {
    return <ErrorMsg msg="No Products found!" />;
  }

  // Sorting logic
  const sortingMethods = {
    "Low to High": () => [...product_items].sort((a, b) => a.price - b.price),
    "High to Low": () => [...product_items].sort((a, b) => b.price - a.price),
    "New Added": () =>
      [...product_items].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    "On Sale": () => product_items.filter((p) => p.discount > 0),
  };

  if (selectValue && sortingMethods.hasOwnProperty(selectValue)) {
    product_items = sortingMethods[selectValue]();
  }

  // Price filter
  product_items = product_items.filter(
    (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
  );
  const router = useRouter();
  const categoryName = router.query.name || "All Products";

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb   title={categoryName} subtitle="Product Grid" />

      <ShopArea
        all_products={allProducts?.data}
        products={product_items}
        otherProps={{
          priceFilterValues: { priceValue, handleChanges: setPriceValue },
          selectHandleFilter: (e) => {
            setCurrPage(1);
            setSelectValue(e.value);
          },
          currPage,
          setCurrPage,
        }}
        resetCategory={resetCategory}
      />
      <ShopFilterOffCanvas
        all_products={allProducts?.data}
        otherProps={{
          priceFilterValues: { priceValue, handleChanges: setPriceValue },
          selectHandleFilter: (e) => {
            setCurrPage(1);
            setSelectValue(e.value);
          },
          currPage,
          setCurrPage,
        }}
      />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;

export const getServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: { query },
  };
};
