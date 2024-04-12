import { useState } from "react";
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="flex flex-col bg-blue-500 mb-5 text-white p-4">
  <div className="flex items-center space-x-4">
    <Link to="/" className="flex items-center">
      <AiOutlineHome className="mr-2 mt-2" size={24} />
      <span className="mr-2 mt-2">Home</span>
    </Link>
    <Link to="/shop" className="flex items-center ">
      <AiOutlineShopping className="mr-2 mt-2" size={24} />
      <span>Shop</span>
    </Link>
    <Link to="/cart" className="flex items-center">
      <AiOutlineShoppingCart className="mr-2 mt-2" size={24} />
      <span>Cart</span>
      {cartItems.length > 0 && (
        <span className="px-1 py-0 ml-2 mt-[1rem] text-sm text-white bg-red-500 rounded-full">
          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
        </span>
      )}
    </Link>
    <Link to="/favorite" className="flex items-center">
      <FaHeart className="mr-2 mt-2" size={24} />
      <span>Favorites</span>
      <FavoritesCount />
    </Link>
  </div>
  <div>
    {userInfo ? (
      <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center absolute bottom-1 right-10">
        <span>{userInfo.username}</span>
        <svg
          className={`h-4 w-4 ml-1 transition-transform ${
            dropdownOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>
    
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 bg-white text-black">
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100">
                    Category
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    ) : (
      <div className="flex flex-col space-y-2">
        <Link to="/login" className="flex items-center">
          <AiOutlineLogin className="mb-[1rem] ml-[110rem]" size={24} />
          <span>Login</span>
        </Link>
        <Link to="/register" className="flex items-center">
          <AiOutlineUserAdd className="ml-[110rem]" size={24} />
          <span>Register</span>
        </Link>
      </div>
    )}
  </div>
</nav>

  );
};

export default Navigation;
