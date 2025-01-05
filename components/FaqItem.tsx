"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  item: {
    id: number;
    question: string;
    answer: string;
  };
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

const FaqItem = ({ item, index, isActive, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        onClick={onToggle}
        className="w-full py-6 text-left focus:outline-none group"
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-sm text-gray-400 font-medium w-8">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors duration-200">
              {item.question}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-viote-200 group-hover:border-violet-400 transition-colors">
              <ChevronDown className="w-5 h-5 text-violet-500" />
            </div>
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            id={`faq-answer-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 flex gap-4">
              <span className="text-sm text-transparent w-8  ">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              <div className="text-gray-600 flex-1 text-justify leading-relaxed">{item.answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqItem;
