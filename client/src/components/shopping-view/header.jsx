import { Heart, HousePlug, LogOut, Menu, ShoppingCart, UserCog, Search, X, Gift, Star, Globe, MapPin, Phone } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems, brandMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col gap-6 mb-3 lg:mb-0 lg:items-center lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          to={menuItem.path}
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="relative flex items-center gap-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:text-purple-600 group px-3 py-1.5 rounded-lg hover:bg-purple-50/60 hover:shadow-sm"
        >
          <span className="text-base transition-transform duration-300 group-hover:scale-110">{menuItem.icon}</span>
          {menuItem.label}
          <span className="absolute bottom-0 left-3 w-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-[calc(100%-24px)] transition-all duration-300 rounded-full"></span>
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="space-y-4">
      {/* User Avatar & Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center w-full gap-2 p-3 transition-colors rounded-lg hover:bg-gray-100">
            <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500">
              <AvatarFallback className="text-xs font-bold text-white bg-gradient-to-br from-purple-500 to-blue-500">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-900">{user?.userName}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-48 shadow-xl rounded-xl">
          <DropdownMenuLabel className="font-bold">Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")} className="cursor-pointer">
            <UserCog className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Star className="w-4 h-4 mr-2" />
            My Rewards
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  const cartCount = cartItems?.items?.length || 0;

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top Bar - Account & Info */}
      <div className="hidden lg:block bg-gray-50 border-b border-gray-200 px-8 py-2.5">
        <div className="flex items-center justify-between">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5 hover:text-purple-600 cursor-pointer transition-colors">
              <Phone className="w-4 h-4" />
              <span>Customer Service</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-purple-600 cursor-pointer transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Track Order</span>
            </div>
          </div>

          {/* Right: User Account */}
          <div className="flex items-center gap-6 text-xs">
            {!isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="link"
                  className="h-auto p-0 text-gray-600 hover:text-purple-600"
                  onClick={() => navigate("/auth/login")}
                >
                  Sign In
                </Button>
                <div className="w-px h-4 bg-gray-300"></div>
                <Button
                  variant="link"
                  className="h-auto p-0 text-gray-600 hover:text-purple-600"
                  onClick={() => navigate("/auth/register")}
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Welcome, <span className="font-semibold text-gray-900">{user?.userName}</span></span>
                <div className="w-px h-4 bg-gray-300"></div>
                <Button
                  variant="link"
                  className="h-auto p-0 text-gray-600 hover:text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-12">
        {/* Logo */}
        <Link to="/shop/home" className="relative flex items-center flex-shrink-0 gap-2 group">
          <div className="p-2 transition-all duration-300 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 group-hover:shadow-lg group-hover:scale-110">
            <HousePlug className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-base font-black leading-5 text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              Ecommerce
            </span>
          </div>
        </Link>

        {/* Search Bar - Center */}
        <div className="items-center flex-1 hidden max-w-xl mx-6 lg:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products, brands..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm"
            />
            <button className="absolute top-0 bottom-0 right-0 px-4 text-white transition-shadow rounded-r-lg bg-gradient-to-r from-purple-500 to-blue-600 hover:shadow-md">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
          {/* Wishlist - Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden transition-all duration-300 rounded-lg md:flex hover:bg-red-100 group"
          >
            <Heart className="w-5 h-5 text-gray-700 transition-colors group-hover:text-red-600" />
          </Button>

          {/* Cart */}
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              variant="ghost"
              size="icon"
              className="relative transition-all duration-300 rounded-lg hover:bg-blue-100 group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-700 transition-colors group-hover:text-blue-600" />
                {cartCount > 0 && (
                  <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white rounded-full -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
            </Button>
            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                  ? cartItems.items
                  : []
              }
            />
          </Sheet>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="transition-all duration-300 rounded-lg lg:hidden hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h2 className="font-bold text-gray-900">Menu</h2>
                </div>
                <MenuItems />
                <div className="p-4 mt-auto border-t">
                  <HeaderRightContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Category Menu - Desktop Only */}
      <div className="hidden px-8 py-3 bg-white border-t border-gray-200 lg:flex lg:items-center lg:gap-4">
        {/* Categories Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 border-gray-300 hover:bg-purple-50 hover:border-purple-400 hover:text-purple-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
              <span className="text-sm font-medium">Categories</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="py-2">All Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {shoppingViewHeaderMenuItems.slice(1, -1).map((menuItem) => (
              <DropdownMenuItem key={menuItem.id} asChild>
                <Link
                  to={menuItem.path}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-base">{menuItem.icon}</span>
                  <span className="text-sm">{menuItem.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Brands Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" />
              </svg>
              <span className="text-sm font-medium">Brands</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="py-2">Top Brands</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {brandMenuItems.map((brand) => (
              <DropdownMenuItem key={brand.id} asChild>
                <Link
                  to={`/shop/listing?brand=${brand.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-base">{brand.icon}</span>
                  <span className="text-sm">{brand.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default ShoppingHeader;
