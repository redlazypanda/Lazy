import React from 'react';
import { motion } from 'framer-motion';

const BackgroundOrbs: React.FC = () => {
  const orbs = [
    { size: 200, x: '10%', y: '20%', delay: 0, color: 'from-neon-pink/20 to-neon-blue/20' },
    { size: 150, x: '80%', y: '10%', delay: 2, color: 'from-neon-blue/15 to-neon-purple/15' },
    { size: 300, x: '70%', y: '70%', delay: 4, color: 'from-neon-purple/10 to-neon-pink/10' },
    { size: 120, x: '20%', y: '80%', delay: 1, color: 'from-neon-blue/25 to-neon-pink/25' },
    { size: 180, x: '50%', y: '40%', delay: 3, color: 'from-neon-pink/15 to-neon-purple/15' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* Orbital rings */}
      <motion.div
        className="orbital-ring"
        style={{
          width: 400,
          height: 400,
          top: '20%',
          right: '15%',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <motion.div
        className="orbital-ring"
        style={{
          width: 300,
          height: 300,
          bottom: '20%',
          left: '10%',
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
