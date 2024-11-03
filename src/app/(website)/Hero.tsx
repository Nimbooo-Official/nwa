import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { ThemeColorToggle } from "@/components/theme-color-toggle";
// import { ThemeModeToggle } from "@/components/theme-mode-toggle";

export const Hero = () => {
  return (
    <section className="py-8 sm:py-16">
      <div className="flex items-center justify-center text-center flex-col gap-6">
        <div className="font-[family-name:var(--font-cinzel-deco)] flex flex-col gap-2">
          <h3 className="lg:text-lg pt-5 font-[family-name:var(--font-poppins)]">
            Enable Followers to Support your Work
          </h3>
          <h1
            className="text-5xl font-black md:text-8xl bg-gradient-to-r from-lime-700 via-cyan-700
              to-teal-700 hover:from-indigo-700 hover:to-orange-700 inline-block
              text-transparent bg-clip-text"
          >
            Monetise
          </h1>
          <p className="lg:text-lg font-[family-name:var(--font-poppins)]">
            your
          </p>
          <h1
            className="text-5xl font-black md:text-8xl bg-gradient-to-r from-lime-700 via-cyan-700
              to-teal-700 hover:from-indigo-700 hover:to-orange-700 inline-block
              text-transparent bg-clip-text"
          >
            Content
          </h1>
          <p className="lg:text-lg font-[family-name:var(--font-poppins)]">
            on the Internet
          </p>
        </div>

        <div className="p-6 lg:max-w-screen-md text-center flex flex-col gap-4">
          <h3>
            Nimbooo&#169; is an Micro & Nano Payments Collection platform that
            enables creators, contributors and publishers to generate QR based
            payment links
          </h3>
          <p className="lg:text-lg">
            <b>Quick & Easy</b>
          </p>
        </div>

        <div className="mx-auto flex w-fit flex-col items-center gap-4">
          <Button size="xl">Join Waitlist</Button>
          <div>
            <span className="mx-4 inline-flex items-center -space-x-4">
              <Avatar className="size-14 border">
                <AvatarImage
                  src="https://www.shadcnblocks.com/images/block/avatar-1.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-14 border">
                <AvatarImage
                  src="https://www.shadcnblocks.com/images/block/avatar-2.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-14 border">
                <AvatarImage
                  src="https://www.shadcnblocks.com/images/block/avatar-3.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-14 border">
                <AvatarImage
                  src="https://www.shadcnblocks.com/images/block/avatar-4.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-14 border">
                <AvatarImage
                  src="https://www.shadcnblocks.com/images/block/avatar-5.webp"
                  alt="placeholder"
                />
              </Avatar>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-green-600 text-green-600" />
              <Star className="size-5 fill-green-600 text-green-600" />
              <Star className="size-5 fill-green-600 text-green-600" />
              <Star className="size-5 fill-green-600 text-green-600" />
              <Star className="size-5 fill-green-600 text-green-600" />
              <span className="font-semibold">5.0</span>
            </div>
            <p className="text-left font-medium text-muted-foreground">
              from 200+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
