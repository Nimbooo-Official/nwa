"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import err from "/public/images/error.png";
import Image from "next/image";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
            src={err} // Replace with your actual image path
            alt="Error Image"
            width={600}
            height={600}
            className="object-contain"
          />

          {/* Error message */}
          <h2 className="font-bold text-4xl mt-8 text-primary animate-bounce">
            Oops! There is Some Error!
          </h2>
          <p className="text-xl mt-4 text-secondary-foreground">
            Please try again
          </p>

          {/* Back to Home button */}
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      </div>
    </>
  );
}
