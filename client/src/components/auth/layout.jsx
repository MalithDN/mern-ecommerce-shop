import { Outlet } from "react-router-dom";
import onlineShoppingImage from "@/assets/online-shopping.jpeg";
import bannerImage from "@/assets/banner-1.webp";

function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen bg-white">
      <div 
        className="relative items-center justify-center hidden w-1/2 px-12 overflow-hidden bg-center bg-cover lg:flex"
        style={{
          backgroundImage: `url(${onlineShoppingImage})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-md space-y-8 text-center text-white">
          <div>
            <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight">
              Welcome to<br />ECommerce Shopping
            </h1>
            <p className="text-lg text-gray-100 opacity-90">
              Your one-stop shop for everything you need
            </p>
          </div>
          
          <div className="pt-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 rounded-full bg-white/20 backdrop-blur">
                <span className="font-bold text-white">✓</span>
              </div>
              <p className="text-sm text-gray-100">Wide selection of products</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 rounded-full bg-white/20 backdrop-blur">
                <span className="font-bold text-white">✓</span>
              </div>
              <p className="text-sm text-gray-100">Secure payment options</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 rounded-full bg-white/20 backdrop-blur">
                <span className="font-bold text-white">✓</span>
              </div>
              <p className="text-sm text-gray-100">Fast and reliable delivery</p>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="relative flex items-center justify-center flex-1 px-4 py-12 bg-center bg-cover sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent backdrop-blur-sm"></div>
        
        <div className="relative z-10 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
