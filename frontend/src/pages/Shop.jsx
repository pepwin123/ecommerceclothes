import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="bg-[#ede1e1] p-5 mt-5 mb-2 flex flex-col md:flex-row md:justify-between md:space-x-5 ">
            <div className="w-full md:w-[15rem]">
              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                Filter by Categories
              </h2>

              <div className="p-5">
                {categories?.map((c) => (
                  <div key={c._id} className="mb-5">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="red-checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />

                      <label
                        htmlFor="pink-checkbox"
                        className="ml-2 text-sm font-medium text-black dark:text-black-300"
                      >
                        {c.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[15rem]">
              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                Filter by Brands
              </h2>

              <div className="p-5">
                {uniqueBrands?.map((brand) => (
                  <div key={brand} className="flex items-center mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-black dark:text-black-300"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="w-full md:w-[15rem]">
              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
                Filter by Price
              </h2>

              <div className="p-5">
                <input
                  type="text"
                  placeholder="Enter Price"
                  value={priceFilter}
                  onChange={handlePriceChange}
                  className="w-full px-3 py-2 placeholder-black-400 border rounded-lg focus:outline-none focus:ring focus:border-black-300"
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="p-3">
          {/* <h2 className="h4 text-center mb-5 font-bold text-black">
            {products?.length} Products
          </h2> */}
          <h3  className="h4 text-center mb-5 font-bold text-black">All Products</h3>
          <div className="flex flex-wrap">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div className="p-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;