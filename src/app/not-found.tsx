import Image from "next/image";
import image from "../assets/a-woman-stands-near-the-smartphone-on-the-screen-error-404-page-system-error-png.webp";
import Link from "next/link";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="text-center">
        <Image
          src={image}
          width={500}
          height={500}
          alt="Not Found"
          className="rounded-lg shadow-lg"
        />
        <h1 className="mt-6 text-4xl font-semibold">Oops! Page Not Found</h1>
        <p className="mt-2 text-xl mb-3">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 border-2 border-red-500 text-red-500  font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;