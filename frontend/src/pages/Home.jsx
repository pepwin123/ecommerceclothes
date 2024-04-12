import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl ml-20 font-bold text-gray-800">
                Latest Products
              </h1>
              <Link
                to="/shop"
                className="inline-block px-6 py-2 text-sm font-semibold text-white uppercase bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-700 transition duration-300"
              >
                Explore More
              </Link>
            </div>
            <p className="mt-2 ml-20 text-sm text-black-600 text-black">
              Discover our curated selection of special products.
            </p>
          </div>

          <div className="container mx-auto">
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {data.products.map((product, index) => (
      <div key={product._id} className={`${index !== 0 ? 'ml-[15rem]' : ''}`}>
        <Product product={product} />
      </div>
    ))}
  </div>
</div>

        </>
      )}
    </>
  );
};

export default Home;
