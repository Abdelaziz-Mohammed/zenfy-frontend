import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-7xl font-bold text-red-500 mb-6">404</h1>
      <p className="text-xl mb-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <p className="mb-4 text-neutral-500">
        It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="utline-0 border-0 h-12 flex items-center justify-center gap-2 px-6 rounded-4xl text-white bg-[#8B9D83]
          text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit mx-auto mt-10"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default Error;
