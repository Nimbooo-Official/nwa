'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

const CardComponent = () => {
  const cards = [
    {
      image: '/images/Nimbooo_Lime.png',
      header: 'Card One',
      message: 'This is the message for card one. It can be longer or shorter based on the content.',
      footer: 'Footer Info 1',
    },
    {
      image: '/images/Nimbooo_Lime.png',
      header: 'Card Two',
      message: 'This is the message for card two. Customize this message as needed.',
      footer: 'Footer Info 2',
    },
    {
      image: '/images/Nimbooo_Lime.png',
      header: 'Card Three',
      message: 'This is the message for card three. Add any content here.',
      footer: 'Footer Info 3',
    },
    {
      image: '/images/Nimbooo_Lime.png',
      header: 'Card Four',
      message: 'This is the message for card four. Add any content here.',
      footer: 'Footer Info 4',
    },
  ];

  // Duplicate the cards array to create an infinite loop effect
  const infiniteCards = [...cards, ...cards]; // Double the array for smooth looping

  return (
    <div className="relative w-full  overflow-hidden p-6">
      {/* Gradient Overlay for Blurry Effect */}
      
    

      {/* Outer wrapper to constrain the scrolling */}
      <motion.div
        className="flex space-x-6"
        animate={{ x: [-1000, 0] }} // Scroll from left to right
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15, // Adjust duration for scroll speed
        }}
      >
        {infiniteCards.map((card, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-80 min-w-[320px]"
          >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 h-48">
              <Image
                src={card.image}
                alt={card.header}
                height={100}
                width={100}
                className="w-100 h-100 object-cover flex content-cente mt-10 p-2"
              />
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{card.header}</h2>
                <p className="text-sm text-gray-600 mb-4">{card.message}</p>
              </div>
              <div className="text-sm font-semibold text-gray-500">{card.footer}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CardComponent;
