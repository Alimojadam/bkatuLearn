// CoursPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AboutCourse from './AboutCourse';
import CommentsSection from './CommentsSection';
import Syllabus from './Syllabus';
import TeacherInfoPage from './TeacherInfoPage';
import { cards } from './CardsInfo';
import { useUser } from '../coursesContext';
import axios from 'axios';

const CoursPage = () => {
  const { id } = useParams();
  const { user, setUser } = useUser();
  
  const [course, setCourse] = useState({});
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(""); // مقدار اولیه رشته خالی


  const [check , setCheck]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/is-saved`,
          {courseId : id},
          { withCredentials: true } // اگر کوکی یا توکن نیاز است
        );
        console.log(response.data.saved)
        if (response.status === 200) {
          setCheck(response.data.saved)
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/course/${id}`);
        if (response.status === 200) {
          const c = response.data; // حالا response.data یک آبجکت واحد است
          setCourse({
            id: c._id,
            teacherId : c.publisher._id,
            title: c.title || "بدون عنوان",
            price: c.price ? c.price : "رایگان!",
            teacher: c.publisher?.name || "ناشناس",
            syllabus: c.seasons || [],
            aboutCourse: c.description || "",
            aboutTeacherCourse: c.publisher.aboutTeacher || "",
            video: c.video || "",
          });
          setNewPrice(c.price || "");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);
  
  
  

  const [activeTab, setActiveTab] = useState(() => {
    if (window.innerWidth < 640) {
      return "Syllabus";
    } else {
      return "comments";
    }
  });
  
  const EditeNavigate=useNavigate()

  const handleEditeNavigate=(e,id)=>{
    e.preventDefault()
    EditeNavigate(`/EditeCours/${id}`)

  }

  const [isRegistered, setIsRegistered] = useState(null);
  useEffect(() => {
    if (user?.coursesId && course?.id) {
      setIsRegistered(user.coursesId.includes(course.id));
    } else {
      setIsRegistered(false); // اگر داده آماده نیست، false نمایش بده
    }
  }, [user, course]);
  
  

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

  const handleRegisterCourse = async () => {
    if (!user || user.type === "Admin") {
      alert("ابتدا وارد حساب کاربری خود شوید");
      return;
    }
  
    const userCourses = Array.isArray(user.corsesId) ? user.corsesId : [];
  
    if (!userCourses.includes(course.id)) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/save/${course.id}`,
          { },
          {withCredentials: true},
        );
        if (response.status === 200) {
          const updatedUser = {
            ...user,
            corsesId: [...userCourses, course.id],
          };
          setUser(updatedUser); // کانتکست به‌روز بشه
          setIsRegistered(true);
          alert("ثبت‌نام با موفقیت انجام شد!");
        }
      } catch (err) {
        console.error("خطا در ثبت‌نام:", err);
        console.log(err.response)
        alert("مشکلی پیش آمد. دوباره تلاش کنید.");
      }
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
  const isAdmin = user?.type?.toLowerCase() === "admin";


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
    <div className="min-h-screen m-0 p-0 flex flex-col sm:flex-row overflow-hidden">
      <div className="aboutCours w-[100%] sm:w-[60%] bg-[#eef3f9] flex flex-col justify-start items-center">
        <div className="cours flex flex-col gap-[30px] justify-center items-center w-[95%] mt-[50px]">
          <video
            // width="420"
            // height="260"
            controls
            className="rounded-[10px] w-[80%] h-[10%] sm:w-[420px] sm:h-[220px] shadow-xl shadow-[#ccc]"
            key={videoSrc} // برای رفرش کردن کامل پلیر وقتی src تغییر می‌کند
          >
            <source src={videoSrc} type="video/mp4" />
            مرورگر شما ویدیو را پشتیبانی نمی‌کند.
          </video>
          <div className="w-[70%] sm:w-[50%] flex flex-col gap-[10px] items-end ">
            <p dir='rtl' className="text-right font-[1] text-[#111]">موضوع : {course.title}</p>
            <div className="w-full flex flex-col sm:flex-row-reverse justify-between items-end gap-1 sm:gap-0 sm:items-center">
              <p dir='rtl' className="text-right text-[#111]">قیمت : <span className='text-[#3073c1]'>{course.price}</span></p>
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
            <div className={`flex ${isTeacherOwner? "flex-col" : "flex-row-reverse"} sm:flex-row-reverse justify-between items-end sm:items-center gap-1 sm:gap-0 w-[100%]`}>
              <p dir='rtl' className="font-[1]  text-[#111]">مدرس : {course.teacher}</p>
              <div className=" flex justify-center items-center">
                {isTeacherOwner ?
                  (
                    <p onClick={(e) => handleEditeNavigate(e, course.id)} className="bg-transparent text-green-600 border border-green-600 py-[3px] px-[20px] rounded-[3px] cursor-pointer">ویرایش اطلاعات دوره</p>

                  )
                  :
                  (
                    check ? (
                      <p onClick={handleRegisterCourse} className="bg-transparent text-green-600 border border-green-600 py-[3px] px-[10px] rounded-[3px] cursor-default">ثبت‌نام شده</p>
                    ) : (
                      <p onClick={handleRegisterCourse} className="bg-[#3073c1] text-[snow] py-[3px] px-[20px] rounded-[3px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md">ثبت‌نام</p>
                    )
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t-[2px] border-[#3073c1] w-[80%] mt-[15px]" />
        <div className="relative w-[85%] sm:w-[80%]">
          <div className="absolute right-0 flex gap-4 flex-row-reverse justify-start items-start mt-[20px] px-[5px] py-[20px]">
            <p
              onClick={() => setActiveTab("Syllabus")}
              className={`cursor-pointer sm:hidden text-[16px] sm:text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "Syllabus" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              سرفصل ها
            </p>
            <p onClick={() => setActiveTab("comments")} className={`cursor-pointer text-[16px] sm:text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "comments" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              نظرات
            </p>

            <p
              onClick={() => setActiveTab("aboutCourse")}
              className={`cursor-pointer text-[16px] sm:text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "aboutCourse" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              درباره دوره
            </p>

            <p
              onClick={() => setActiveTab("aboutTeacher")}
              className={`cursor-pointer text-[16px] sm:text-[17px] border-b-[2px] font-[1] text-right text-[#111] pb-[1px] font-bold transition-all duration-300 ${
                activeTab === "aboutTeacher" ? "border-[#3073c1]" : "border-transparent"
              }`}
            >
              درباره مدرس
            </p>
          </div>
        </div>

        {/* نمایش محتوای تب‌ها */}
        <div className="w-[100%] flex justify-center mt-4">
          {activeTab === "comments" && (<div className='w-[80%]'><CommentsSection /></div>)}
          {activeTab === "aboutTeacher" && (<div className='w-[80%]'><TeacherInfoPage aboutTeacherCourse={course.aboutTeacherCourse} /></div>)}
          {activeTab === "aboutCourse" && (<div className='w-[80%]'><AboutCourse aboutCourse={course.aboutCourse} /></div>)}
          {activeTab === "Syllabus" &&  (
            <div className="w-full bg-[#eef3f9] mt-13">
            <Syllabus
              syllabus={course.syllabus}
              course={course}
              isAdmin={isAdmin}
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
          )}
        </div>
      </div>

      <div className="hidden sm:block w-[40%] bg-[#3073c1]">
        <Syllabus
          syllabus={course.syllabus}
          course={course}
          onPlayVideo={playVideo}
          isTeacherOwner={isTeacherOwner}
          isAdmin={isAdmin}
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
