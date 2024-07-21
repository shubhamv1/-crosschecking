import React from 'react';
import { motion } from 'framer-motion';
import './Balloons.css';

const balloonVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: [0, -50, -100],
    opacity: [0, 1, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1,
      staggerChildren: 0.5,
    },
  },
};

const Balloons = () => {
  return (
    <div className="balloons-container">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className={`balloon balloon-${i % 5}`}
          variants={balloonVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </div>
  );
};

export default Balloons;
