// CoursPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AboutCourse from './AboutCourse';
import CommentsSection from './CommentsSection';
import Syllabus from './Syllabus';
import TeacherInfoPage from './TeacherInfoPage';
import { cards } from './CardsInfo';
import { useUser } from '../coursesContext';

const CoursPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(cards.find(c => c.id === parseInt(id)));
  const { user, setUser } = useUser();

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(course.price);

  const [activeTab, setActiveTab] = useState("comments");
  const EditeNavigate=useNavigate()

  const handleEditeNavigate=(e,id)=>{
    e.preventDefault()
    EditeNavigate(`/EditeCours/${id}`)

  }

  const [isRegistered, setIsRegistered] = useState(() => {
    return user?.corsesId.includes(course?.id);
  });

  const [videoSrc, setVideoSrc] = useState(course ? course.video : '');

  // آزادسازی URLهای blob قدیمی برای جلوگیری از نشتی حافظه
  useEffect(() => {
    return () => {
      if (videoSrc && videoSrc.startsWith('blob:')) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  const playVideo = (src) => {
    if (videoSrc && videoSrc.startsWith('blob:')) {
      URL.revokeObjectURL(videoSrc);
    }
    setVideoSrc(src);
  };

  if (!course) {
    return <div>دوره پیدا نشد!</div>;
  }

  const handleRegisterCourse = () => {
    if (!user) {
      alert("کاربر یافت نشد!");
      return;
    }
  
    if (!user.corsesId.includes(course.id)) {
      const updatedUser = {
        ...user,
        corsesId: [...user.corsesId, course.id],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsRegistered(true);
      alert("ثبت‌نام با موفقیت انجام شد!");
    } else {
      alert("شما قبلاً ثبت‌نام کرده‌اید.");
    }
  };
  
  const handleAddSection = (title) => {
    const updatedCourse = {
      ...course,
      syllabus: [...course.syllabus, { title, subtopics: [] }],
    };
    setCourse(updatedCourse);
  };
  
  const isTeacherOwner = user?.id === course.teacherId;

  const handleDeleteSection = (sectionIndex) => {
    const newSyllabus = [...course.syllabus];
    newSyllabus.splice(sectionIndex, 1);
    setCourse({ ...course, syllabus: newSyllabus });
  };
  
  const handleDeleteEpisode = (sectionIndex, episodeIndex) => {
    const newSyllabus = [...course.syllabus];
    newSyllabus[sectionIndex].subtopics.splice(episodeIndex, 1);
    setCourse({ ...course, syllabus: newSyllabus });
  };
  
  

  return (
    <div className="flex">
      <div className="aboutCours w-[60%] bg-[#eef3f9] flex flex-col justify-start items-center">
        <div className="cours flex flex-col gap-[30px] justify-center items-center w-[95%] mt-[50px]">
          <video
            width="420"
            height="260"
            controls
            className="rounded-[10px] shadow-xl shadow-[#ccc]"
            key={videoSrc} // برای رفرش کردن کامل پلیر وقتی src تغییر می‌کند
          >
            <source src={videoSrc} type="video/mp4" />
            مرورگر شما ویدیو را پشتیبانی نمی‌کند.
          </video>
          <div className="w-[50%] flex flex-col gap-[10px] items-end ">
            <p className="text-right font-[1] text-[#111]">موضوع : {course.title}</p>
            <div className="w-full flex flex-row-reverse justify-between items-center">
              <p className="text-right text-[#111]">قیمت : <span className='text-[#3073c1]'>{course.price} تومان</span></p>
              {isTeacherOwner && (
                isEditingPrice ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ease-in-out">

                    <div dir='rtl'
                        className="bg-white text-[#3073c1] border border-[#3073c1] rounded-xl shadow-xl px-6 py-5 w-[max-content] max-w-md
                        flex flex-col items-start gap-4 text-center animate-fade-in-down transition-all duration-300 "
                     >
                      <label htmlFor="" className='text-[17px] text-[#111]'>قیمت جدید</label>
                      <input
                        type="number"
                        className="border border-gray-300 px-2 py-1 rounded text-right outline-none"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                      />
                      <div className="flex gap-3">
                        <button
                            onClick={() => {
                              setCourse({ ...course, price: newPrice });
                              setIsEditingPrice(false);
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                          >
                          ارسال درخواست
                        </button>
                        <button
                            onClick={() => {
                              setNewPrice(course.price);
                              setIsEditingPrice(false);
                            }}
                            className="bg-gray-400 text-white px-4 py-1 rounded cursor-pointer"
                          >
                            لغو
                        </button>
                      </div>
                   </div>
                  </div>
                ) : (
                  <p
                    onClick={() => setIsEditingPrice(true)}
                    className="bg-transparent text-[orange] border border-[orange] py-[3px] px-[20px] rounded-[3px] cursor-pointer"
                  >
                    درخواست تغییر قیمت
                  </p>
                )
              )}

            </div>
            <div className="flex flex-row-reverse justify-between items-center w-[100%]">
              <p className="font-[1]  text-[#111]">مدرس : {course.teacher}</p>
              <div className=" flex justify-center items-center">
                {isTeacherOwner ?
                  (
                    <p onClick={(e) => handleEditeNavigate(e, course.id)} className="bg-transparent text-green-600 border border-green-600 py-[3px] px-[20px] rounded-[3px] cursor-pointer">ویرایش اطلاعات دوره</p>

                  )
                  :
                  (
                    isRegistered ? (
                      <p onClick={handleRegisterCourse} className="bg-transparent text-green-600 border border-[#3073c1] py-[3px] px-[10px] rounded-[3px] cursor-default">ثبت‌نام شده</p>
                    ) : (
                      <p onClick={handleRegisterCourse} className="bg-[#3073c1] text-[snow] py-[3px] px-[20px] rounded-[3px] cursor-pointer">ثبت‌نام</p>
                    )
                  )
                }
              </div>
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
          {activeTab === "aboutTeacher" && <TeacherInfoPage aboutTeacherCourse={course.aboutTeacherCourse} />}
          {activeTab === "aboutCourse" && <AboutCourse aboutCourse={course.aboutCourse} />}
        </div>
      </div>

      <div className="w-[40%] bg-[#3073c1]">
        <Syllabus
          syllabus={course.syllabus}
          course={course}
          onPlayVideo={playVideo}
          isTeacherOwner={isTeacherOwner}
          onAddSection={handleAddSection}
          onDeleteSection={handleDeleteSection}
          onDeleteEpisode={handleDeleteEpisode}
          onAddEpisode={(sectionIndex, newEpisode) => {
            const updatedSyllabus = course.syllabus.map((section, idx) => {
              if (idx === sectionIndex) {
                return {
                  ...section,
                  subtopics: [...section.subtopics, newEpisode],
                };
              }
              return section;
            });
            setCourse({ ...course, syllabus: updatedSyllabus });
          }}
          onEditEpisode={(sectionIndex, episodeIndex, updatedEpisode) => {
            const updatedSyllabus = course.syllabus.map((section, sIndex) => {
              if (sIndex === sectionIndex) {
                return {
                  ...section,
                  subtopics: section.subtopics.map((ep, eIndex) =>
                    eIndex === episodeIndex ? updatedEpisode : ep
                  ),
                };
              }
              return section;
            });

            setCourse(prev => ({ ...prev, syllabus: updatedSyllabus }));
          }}
          onUpdateSyllabus={(updatedSyllabus) => {
            setCourse(prev => ({
              ...prev,
              syllabus: updatedSyllabus,
            }));
          }}
        />


      </div>
    </div>
  );
};

export default CoursPage;
