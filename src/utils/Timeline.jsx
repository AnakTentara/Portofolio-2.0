import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';

const EditingResultsItem = ({ title, description, date, video, icon: Icon, isActive, onClick }) => {
  return (
    <motion.div 
      className={`
        relative p-4 rounded-lg cursor-pointer 
        transition-all duration-300 
        ${isActive 
          ? 'bg-primary/10 border-l-4 border-primary' 
          : 'hover:bg-gray-800/50'}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center mb-2">
        <div className="mr-4 p-3 rounded-full bg-gray-700 text-gray-400">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
    </motion.div>
  );
};

const EditingResultsJourney = () => {
  const [activeItem, setActiveItem] = useState(0);

  const editingResultsData = [
    {
      title: "My First Big Project",
      date: "2025",
      description: "Learned about how shot with many actors.",
      video: "https://www.youtube.com/embed/7ZLEr6J2Spc",
      icon: Youtube
    },
    {
      title: "Searching for Backsound",
      date: "2024",
      description: "Learned about the magic of backsound.",
      video: "https://www.youtube.com/embed/RTUjUz0EX7E",
      icon: Youtube
    },
    {
      title: "Using Video Editing Techniques",
      date: "2024",
      description: "Learned video editing techniques using Adobe Premiere Pro.",
      video: "https://www.youtube.com/embed/fiwWnCcFbk0",
      icon: Youtube
    },
    {
      title: "Color Grading and Correction",
      date: "2024",
      description: "Learned about color grading and correction techniques using Adobe Premiere Pro",
      video: "https://www.youtube.com/embed/eTjX_RZ-Aao",
      icon: Youtube
    },
    {
      title: "Video Editing Basics",
      date: "2022",
      description: "Learned the basics of video editing using Adobe Premiere Pro.",
      video: "https://www.youtube.com/embed/XWERBANyAY4",
      icon: Youtube
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 p-8 rounded-xl"
    >
      <h2 className="text-4xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent">
        Editing Results Journey
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Hasil Editing */}
        <motion.div 
          key={activeItem}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h3 className="text-2xl font-bold text-white">
            {editingResultsData[activeItem].title}
          </h3>
          <p className="text-gray-300">{editingResultsData[activeItem].description}</p>
          <iframe 
            className="w-full h-64 mt-4 rounded-lg"
            src={editingResultsData[activeItem].video}
            frameBorder="0"
            allowFullScreen
          />
        </motion.div>
        
        {/* Timeline */}
        <div className="space-y-4">
          {editingResultsData.map((item, index) => (
            <EditingResultsItem
              key={index}
              {...item}
              isActive={activeItem === index}
              onClick={() => setActiveItem(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default EditingResultsJourney;