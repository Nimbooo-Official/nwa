import error from "/public/images/error.png";
import Image from "next/image";
import Link from "next/link";
const NotFound = () => {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-background text-center
          px-4"
      >
        {/* Logo in the top-left corner */}
        <div className="absolute top-4 left-4 ml-4">
          <Link href="/">
            <Image
              src="/images/Nimbooo_Logo_Final_Lime_large.png"
              alt="Logo"
              width={200}
              height={200}
              className=""
            />
          </Link>
        </div>

        {/* Centered image */}
        <div className="flex flex-col mt-20 items-center mb-32">
          <Image
            src={error} // Replace with your actual image path
            alt="Error Image"
            width={600}
            height={600}
            className="object-contain"
          />

          {/* Error message */}
          <h2 className="font-bold text-4xl mt-8 text-primary animate-bounce">
            Oops! Page Not Found
          </h2>
          <p className="text-xl mt-4 text-secondary-foreground"></p>

          {/* Back to Home button */}
          <Link
            href="/"
            className="mt-8 bg-primary text-white px-4 py-2 rounded-md text-lg font-semibold
              hover:text-secondary-foreground transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
