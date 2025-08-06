"use client";

import { motion } from "framer-motion";


export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-600 font-semibold text-xl">
      <div className="flex space-x-1 items-center">
        <span>Job Dhoondo</span>
        <motion.div className="flex space-x-1" animate="animate">
          <motion.span className="w-2 h-2 bg-blue-600 rounded-full" />
          <motion.span className="w-2 h-2 bg-blue-600 rounded-full" />
          <motion.span className="w-2 h-2 bg-blue-600 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
