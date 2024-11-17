import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import Nimbooo from "../../../public/images/Nimbooo.png";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header>
      <nav className="w-7xl max-w-7xl mx-auto flex items-center justify-between max-sm:justify-center p-4 lg:px-8">
        <div className="text-primary text-5xl font-bold">
          <Image
            src={Nimbooo}
            width={180}   // Set width explicitly
            height={180}  // Set height explicitly
            alt="Nimbooo Brand Logo"
            className="w-60"
          />
        </div>
        <div className="flex flex-row items-center gap-6 max-sm:hidden">
          <Link href="/signup"><Button size="xl">Join Waitlist</Button></Link>
          <ThemeModeToggle />
        </div>
      </nav>
    </header>
  );
};
