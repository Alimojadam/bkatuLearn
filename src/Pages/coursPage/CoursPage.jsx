import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AboutCourse from './AboutCourse';
import CommentsSection from './CommentsSection';
import Syllabus from './Syllabus';
import TeacherInfoPage from './TeacherInfoPage';
import {cards} from './CardsInfo';

const CoursPage = () => {
  

  const { id } = useParams();
  const course = cards.find(c => c.id === parseInt(id));

  const [activeTab, setActiveTab] = useState("comments"); // مقدار پیش‌فرض: نظرات

  const [videoSrc , setVideoSrc]= useState(course ? course.video : '');

  const playVideo=(src)=>{
    setVideoSrc(src);
  }
  if (!course) {
    return <div>دوره پیدا نشد!</div>;
  }

  return (
    <div className="flex">
      <div className="aboutCours w-[60%] bg-[#eef3f9] flex flex-col justify-start items-center">
        <div className="cours flex flex-col gap-[30px] justify-center items-center w-[95%] mt-[50px]">
          <video width="420" height="260" controls className="rounded-[10px] shadow-xl shadow-[#ccc]">
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="w-[50%] flex flex-col gap-[10px] items-end ">
            <p className="text-right font-[1] text-[#111]">موضوع : {course.title}</p>
            <p className="text-right text-[#3073c1]">قیمت : {course.price}</p>
            <div className="flex flex-row-reverse justify-between items-center w-[100%]">
              <p className="font-[1]  text-[#111]">مدرس : {course.teacher}</p>
              <a href="#" className="bg-[#3073c1] py-[3px] px-[20px] rounded-[3px] text-[snow]">ثبتنام</a>
            </div>
          </div>
        </div>
        <hr className="border-t-[2px] border-[#3073c1] w-[80%] mt-[15px]" />
        <div className="relative w-[80%]">
          <div className="absolute right-0 flex gap-4 flex-row-reverse justify-start items-start mt-[20px] px-[5px] py-[20px]">
            <p onClick={() => setActiveTab("comments")} className={`cursor-pointer text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "comments" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              نظرات
            </p>

            <p
              onClick={() => setActiveTab("aboutCourse")}
              className={`cursor-pointer text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "aboutCourse" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              درباره دوره
            </p>


            <p
              onClick={() => setActiveTab("aboutTeacher")}
              className={`cursor-pointer text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "aboutTeacher" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              درباره مدرس
            </p>
          </div>
        </div>

        {/* نمایش محتوای تب‌ها */}
        <div className="w-[80%] mt-4">
          {activeTab === "comments" && <CommentsSection />}
          {activeTab === "aboutTeacher" && <TeacherInfoPage aboutTeacher={course.aboutTeacher} />}
          {activeTab === "aboutCourse" && <AboutCourse aboutCourse={course.aboutCourse} />}
        </div>
      </div>

      <div className="w-[40%] bg-[#3073c1]">
        <Syllabus syllabus={course.syllabus} course={course} onPlayVideo={playVideo}/>
      </div>
    </div>
  );
};

export default CoursPage;
