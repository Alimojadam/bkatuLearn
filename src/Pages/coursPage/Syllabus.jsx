import React, { useState } from 'react';
import { cards } from './CardsInfo';

const Syllabus = (props) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const syllabus = props.syllabus || [];

  return (
    <div className="p-10 flex flex-col justify-center items-end text-right gap-[20px]">
      <h2 className="text-[22px] text-[snow] font-bold mb-4 p-2 border-b border-[#eef3f9]">{props.course.title}</h2>

      <ul className="w-[95%] pr-6 space-y-2 flex flex-col justify-center items-end gap-[15px]">
        {syllabus.map((item, index) => (
          <li key={index} className="p-[5px] flex flex-col justify-center items-end items-center w-full bg-[snow] rounded-[5px] overflow-hidden transition-all duration-300">
            <div className="w-full flex justify-between flex-row-reverse">
                <p className="text-[18px] text-[#3073c1] mr-[5px]">{item.title}</p>
                <button onClick={() => toggleIndex(index)} className="font-[thin]">
                <span className="text-[20px] text-[#111] transition-transform duration-700 ease-in-out cursor-pointer">
                    {openIndex === index ? '▲' : '▼'}
                </span>
                </button>
            </div>

            {/* Subtopics */}
            <ul className={`w-[95%] transition-all duration-300 text-sm pr-5 ${
                openIndex === index ? 'max-h-[500px] py-2' : 'max-h-0 overflow-hidden'
                }`}>
                {item.subtopics.map((sub, subIndex) => (
                <li key={subIndex} className="w-full py-1 pr-2 border-r-2 border-[#3073c1]">
                  <div className="flex flex-row-reverse justify-between items-center border border-[#3073c1] px-[8px] py-[8px] rounded-[5px]">
                    <p className="text-[16px] text-[#3073c1]">{sub.subTitle}</p>
                    <div className="text-[16px] flex gap-[15px] justify-between items-center ml-[5px] text-[#3073c1]">
                        <i className="fas fa-play cursor-pointer" onClick={()=>props.onPlayVideo(sub.video)}></i>
                        <i className="fas fa-paperclip cursor-pointer"></i>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Syllabus;
