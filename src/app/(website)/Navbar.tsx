import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";
import React from "react";
import Image from "next/image";
import Nimbooo from "../../../public/images/Nimbooo.png";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="">
      <nav
        className="w-7xl max-w-7xl mx-auto flex items-center justify-between max-sm:justify-center
          p-4 lg:px-8w-7xl"
      >
        <div className="text-primary text-5xl font-bold">
          <Image
            src={Nimbooo}
            width={180}
            height={60}
            alt="Nimbooo Brand Logo"
          />
        </div>
        <div className="flex flex-row items-center gap-6 max-sm:hidden">
          <Link href="/signup"><Button size="xl">Join Waitlist</Button></Link>
          
          <ThemeModeToggle />
          {/* <Menu className="w-8 h-8" /> */}
        </div>
      </nav>
    </header>
  );
};
