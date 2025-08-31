import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-100 to-blue-100">
      <motion.h1 
        className="text-5xl font-bold text-gray-800"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Exchange Skills, Not Money 💡
      </motion.h1>
      <p className="mt-4 text-lg text-gray-600">
        A peer-to-peer barter platform where students trade skills and grow together 🚀
      </p>
      <motion.button 
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700"
        whileHover={{ scale: 1.05 }}
      >
        Get Started
      </motion.button>
    </div>
  );
}
