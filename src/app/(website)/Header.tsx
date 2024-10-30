import Link from 'next/link';
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-transparent bg-opacity-30 backdrop-blur-md py-4 shadow-md transition duration-300 ease-in-out">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image 
              src="/images/Nimbooo_Logo_Final_Lime_large.png" 
              alt="Nimboo Logo" 
              height={50} 
              width={150} 
            />
          </Link>
        </div>
        
        <nav className="flex space-x-6 items-center">
          <Link href="/about" className="text-secondary-foreground hover:text-primary font-medium">About Us</Link>
          <Link href="/contact" className="text-secondary-foreground hover:text-primary font-medium">Contact Us</Link>
          <Link href="/legal" className="text-secondary-foreground hover:text-primary font-medium px-4 py-2">
            Privacy Policy
          </Link>
          <ThemeColorToggle />
          <ThemeModeToggle />
        </nav>
        
        <div className="flex space-x-3 ">
          <Link href="/login" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 ease-in-out">
             
              Login
            
          </Link>
          <Link href="/signup"  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 ease-in-out">
           
              Sign Up
           
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
