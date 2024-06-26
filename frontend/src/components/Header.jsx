import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      {/* <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
  <div className="lg:block hidden">
    <div className="grid grid-cols-2 gap-4">
      {data.map((product) => (
        <div key={product._id}>
          <SmallProduct product={product} />
        </div>
      ))}
    </div>
  </div>
  <ProductCarousel />
</div> */}

    </>
  );
};

export default Header;
