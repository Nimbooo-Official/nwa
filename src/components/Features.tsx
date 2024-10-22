"use client";

import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import productImage from "@/app/assets/product-image.png";
import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One-click optimization",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

const FeatureTab = (
  props: (typeof tabs)[number] & ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);
  const xPercentage = useMotionValue(1);
  const yPercentage = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  useEffect(() => {
    if (!tabRef.current || !props.selected) return;
    xPercentage.set(0);
    yPercentage.set(0);
    const { height, width } = tabRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;
    const times = [0, width / circumference, (width + height) / circumference, (width * 2 + height) / circumference, 1];
    animate(xPercentage, [0, 100, 100, 0, 0], {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });
    animate(yPercentage, [0, 0, 100, 100, 0], {
      times,
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });
  }, [props.selected]);

  const handleTabHover = () => {
    if (dotLottieRef.current == null) return;
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  };

  return (
    <div
      ref={tabRef}
      onMouseEnter={handleTabHover}
      className="border border-gray-600 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 relative mx-8"
      onClick={props.onClick}
    >
      {props.selected && (
        <motion.div
          style={{
            maskImage,
          }}
          className="absolute inset-0 -m-px border border-[#A369FF] rounded-xl [mask-image:]"
        ></motion.div>
      )}

      <div className="h-12 w-12 border border-gray-500 rounded-lg inline-flex items-center lg:flex-1">
        <DotLottiePlayer
          ref={dotLottieRef}
          src={props.icon}
          className="md:h-20 md:w-16 lg:h-16 lg:w-10 lg:items-center"
        />
      </div>
      <div className="font-medium">{props.title}</div>
      {props.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-black font-semibold">
          new
        </div>
      )}
    </div>
  );
};

export const Features = () => {
  const [selectTab, setSelectTab] = useState(0);
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);
  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;

  const handleSelectTab = (index: number) => {
    setSelectTab(index);

    // Animate background size
    animate(backgroundSizeX, [backgroundSizeX.get(), tabs[index].backgroundSizeX], {
      duration: 1,
      ease: "easeInOut",
    });

    // Animate background position
    animate(backgroundPositionX, [backgroundPositionX.get(), tabs[index].backgroundPositionX], {
      duration: 1,
      ease: "easeInOut",
    });
    animate(backgroundPositionY, [backgroundPositionY.get(), tabs[index].backgroundPositionY], {
      duration: 1,
      ease: "easeInOut",
    });
  };

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Elevate your SEO efforts.
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tighter text-center mt-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, repellendus.
        </p>
        <div className="mt-10 flex flex-col md:flex-row gap-2 md:gap-5">
          {tabs.map((tab, tabIndex) => (
            <FeatureTab
              {...tab}
              selected={selectTab === tabIndex}
              onClick={() => handleSelectTab(tabIndex)}
              key={tab.title}
            />
          ))}
        </div>
        <div className="border border-gray-700 p-2.5 rounded-xl mt-3">
          <motion.div
            className="aspect-video bg-cover border border-gray-700 rounded-lg"
            style={{
              backgroundPosition: backgroundPosition,
              backgroundSize: backgroundSize,
              backgroundImage: `url(${productImage.src})`,
            }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
};
