import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden modern-card group">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden bg-gray-100 h-[280px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-md">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-3 text-xs md:text-sm text-muted-foreground">
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded-full">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-muted-foreground" : ""
              } text-lg font-bold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button 
            disabled
            className="w-full opacity-50 cursor-not-allowed"
          >
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
