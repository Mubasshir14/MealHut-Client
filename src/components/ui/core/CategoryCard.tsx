/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";

const CategoryCard = ({ category }: { category: any }) => {
  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44">
      <div className="w-24 h-24 mx-auto">
        <Image
          src={category?.icon}
          width={96}
          height={96}
          alt="category icon"
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
