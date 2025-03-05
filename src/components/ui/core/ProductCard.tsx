// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { addProduct } from "@/redux/features/cartSlice";
// import { useAppDispatch } from "@/redux/hooks";

// import { IProduct } from "@/types";
// import { Heart, ShoppingCart, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// const ProductCard = ({ product }: { product: IProduct }) => {
//   const dispatch = useAppDispatch();

//   const handleAddProduct = (product: IProduct) => {
//     dispatch(addProduct(product));
//   };

//   return (
//     <Card className="p-3">
//       <CardHeader className="relative p-0 h-48">
//         <Image
//           src={
//             product?.imageUrls[0] ||
//             "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
//           }
//           width={500}
//           height={500}
//           alt="product image"
//           className="rounded-sm h-48 object-cover"
//         />
//         {product?.stock === 0 && (
//           <div className="absolute left-2 top-0 bg-red-500 text-white px-2 rounded-full">
//             Out of Stock
//           </div>
//         )}
//       </CardHeader>

//       <CardContent className=" p-0 mt-2">
//         <Link href={`/products/${product?._id}`} passHref>
//           <CardTitle
//             title={product?.name}
//             className="font-semibold cursor-pointer text-sm"
//           >
//             {product?.name.length > 20
//               ? product?.name?.slice(0, 20) + "..."
//               : product?.name}
//           </CardTitle>
//         </Link>

//         <div className="flex items-center justify-between my-2">
//           <p className="text-sm text-gray-600">
//             {product?.offerPrice ? (
//               <>
//                 <span className="font-semibold mr-2 text-orange-400">
//                   $ {product?.offerPrice.toFixed(2)}
//                 </span>
//                 <del className="font-semibold text-xs">
//                   $ {product?.price.toFixed(2)}
//                 </del>
//               </>
//             ) : (
//               <span className="font-semibold">
//                 $ {product?.price.toFixed(2)}
//               </span>
//             )}
//           </p>

//           <div className="flex items-center justify-center gap-1">
//             <Star className="w-4 h-4" fill="orange" stroke="orange" />
//             <span className="text-sm font-medium text-gray-700">
//               {product?.averageRating}
//             </span>
//           </div>
//         </div>
//       </CardContent>

//       <CardFooter className="block p-0">
//         <div className="flex gap-2 items-center justify-between">
//           <Button
//             disabled={product?.stock === 0}
//             size="sm"
//             variant="outline"
//             className="w-32"
//           >
//             Buy Now
//           </Button>
//           <Button
//             onClick={() => handleAddProduct(product)}
//             disabled={product?.stock === 0}
//             variant="outline"
//             size="sm"
//             className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
//           >
//             <ShoppingCart />
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="w-8 h-8 p-0 flex items-center justify-center rounded-full"
//           >
//             <Heart />
//           </Button>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProductCard;
