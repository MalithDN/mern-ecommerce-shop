import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  ArrowRight,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  Sparkles,
  TrendingUp,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Fallback images if no feature images from database
  const staticBanners = [bannerOne, bannerTwo, bannerThree];
  const displayImages = featureImageList && featureImageList.length > 0 
    ? featureImageList.map(item => item.image)
    : staticBanners;

  useEffect(() => {
    if (displayImages.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % displayImages.length);
      }, 15000);

      return () => clearInterval(timer);
    }
  }, [displayImages]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Banner Section - Modern Architecture */}
      <div className="relative w-full h-[700px] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 bg-purple-500 rounded-full left-1/4 w-96 h-96 mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 bg-blue-500 rounded-full right-1/4 w-96 h-96 mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Images carousel */}
        {displayImages && displayImages.length > 0
          ? displayImages.map((imageUrl, index) => (
              <img
                src={imageUrl}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

        {/* Navigation Controls - always show since we have fallback images */}
        {displayImages && displayImages.length > 0 && (
          <>
            {/* Left navigation */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) =>
                    (prevSlide - 1 + displayImages.length) %
                    displayImages.length
                )
              }
              className="absolute z-20 transition-all duration-300 transform -translate-y-1/2 border rounded-full shadow-2xl w-14 h-14 top-1/2 left-6 bg-white/20 hover:bg-white/40 hover:shadow-2xl backdrop-blur-sm border-white/20"
            >
              <ChevronLeftIcon className="text-white w-7 h-7" />
            </Button>

            {/* Right navigation */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) => (prevSlide + 1) % displayImages.length
                )
              }
              className="absolute z-20 transition-all duration-300 transform -translate-y-1/2 border rounded-full shadow-2xl w-14 h-14 top-1/2 right-6 bg-white/20 hover:bg-white/40 hover:shadow-2xl backdrop-blur-sm border-white/20"
            >
              <ChevronRightIcon className="text-white w-7 h-7" />
            </Button>

            {/* Slide indicators - modern style */}
            <div className="absolute z-20 flex gap-3 transform -translate-x-1/2 bottom-8 left-1/2">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 ${
                    index === currentSlide
                      ? "bg-white w-12 h-3 shadow-lg"
                      : "bg-white/40 hover:bg-white/60 w-3 h-3"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide counter */}
            <div className="absolute z-20 px-4 py-2 border rounded-full top-8 right-8 bg-white/10 backdrop-blur-md border-white/20">
              <span className="text-sm font-semibold text-white">
                {currentSlide + 1} / {displayImages.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Categories Section - Modern Grid Architecture */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200/50">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                Shop Smart
              </span>
            </div>
            <h2 className="mb-4 text-5xl font-black text-gray-900">
              Explore Categories
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Discover our curated collections across multiple categories
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="h-auto overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl"
              >
                <CardContent className="relative flex flex-col items-center justify-center h-48 p-6">
                  {/* Background gradient */}
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-br from-purple-50 via-transparent to-blue-50 group-hover:from-purple-100 group-hover:to-blue-100"></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="p-4 mx-auto mb-4 transition-all duration-300 w-fit rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200 group-hover:scale-110 group-hover:shadow-xl">
                      <categoryItem.icon className="w-8 h-8 text-purple-600 transition-transform duration-300 group-hover:scale-125" />
                    </div>
                    <span className="block text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                      {categoryItem.label}
                    </span>
                    <span className="block mt-2 text-xs text-gray-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      Shop Now
                    </span>
                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 transition-all duration-300 border border-transparent rounded-lg group-hover:border-purple-200"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section - Modern Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200/50">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
                Top Brands
              </span>
            </div>
            <h2 className="mb-4 text-5xl font-black text-gray-900">
              Premium Brands
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Shop from globally recognized and trusted brands
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="h-auto overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl"
              >
                <CardContent className="relative flex flex-col items-center justify-center h-48 p-6">
                  {/* Background gradient */}
                  <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-br from-blue-50 via-transparent to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100"></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="p-4 mx-auto mb-4 transition-all duration-300 w-fit rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 group-hover:scale-110 group-hover:shadow-xl">
                      <brandItem.icon className="w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:scale-125" />
                    </div>
                    <span className="block text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                      {brandItem.label}
                    </span>
                    <span className="block mt-2 text-xs text-gray-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      Explore
                    </span>
                  </div>

                  {/* Border glow */}
                  <div className="absolute inset-0 transition-all duration-300 border border-transparent rounded-lg group-hover:border-blue-200"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Modern Layout */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-pink-100 to-rose-100 border-pink-200/50">
              <TrendingUp className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text">
                Best Sellers
              </span>
            </div>
            <h2 className="mb-4 text-5xl font-black text-gray-900">
              Featured Products
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Discover our most popular and customer-rated products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <div 
                    key={productItem._id} 
                    className="transition-all duration-300 transform group hover:-translate-y-3 hover:shadow-2xl"
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
              : (
                <div className="py-12 text-center col-span-full">
                  <p className="text-lg text-gray-500">Loading products...</p>
                </div>
              )}
          </div>

          {/* View all button */}
          <div className="flex justify-center mt-16">
            <Button
              onClick={() => navigate("/shop/listing")}
              className="flex items-center gap-2 px-10 py-4 font-semibold text-white transition-all duration-300 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-600 hover:shadow-2xl hover:scale-105"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated decorative elements */}
        <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-purple-500/20 mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 rounded-full w-96 h-96 bg-blue-500/20 mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute rounded-full top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full bg-white/10 backdrop-blur-md border-white/20">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-semibold text-white/90">Limited Time Offer</span>
            </div>

            {/* Heading */}
            <h2 className="mb-6 text-6xl font-black text-transparent md:text-7xl bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text">
              Exclusive Deals
            </h2>

            {/* Description */}
            <p className="max-w-3xl mx-auto mb-12 text-lg leading-relaxed md:text-xl text-white/80">
              Get up to 50% off on our premium collection. Enjoy free shipping on all orders over $50. This offer is valid for a limited time only!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button 
                onClick={() => navigate("/shop/listing")}
                className="flex items-center justify-center gap-2 px-10 py-4 text-lg font-bold text-white transition-all duration-300 rounded-full shadow-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 hover:shadow-2xl hover:scale-105"
              >
                Shop All Deals <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="px-10 py-4 text-lg font-bold text-white transition-all duration-300 border-2 rounded-full border-white/50 hover:bg-white/10 hover:border-white backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col justify-center gap-8 mt-12 sm:flex-row text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
