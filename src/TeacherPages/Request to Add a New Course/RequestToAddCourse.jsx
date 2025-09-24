import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const RequestToAddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const imageInputRef = useRef(null);
  const [introVideo, setIntroVideo] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // اعتبارسنجی معمول
    if (!courseName.trim()) newErrors.courseName = "نام دوره الزامی است.";
    if (!courseDescription.trim()) newErrors.courseDescription = "توضیحات دوره الزامی است.";
    if (!courseImage) newErrors.courseImage = "آپلود تصویر دوره الزامی است.";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) return;
  
    try {
      // ارسال فایل‌ها مشابه کد پروفایل
      const formDataToSend = new FormData();
      formDataToSend.append("title", courseName);
      if (courseImage && courseImage instanceof File) {
        formDataToSend.append("thumbnail", courseImage);
      }
      // if (introVideo && introVideo instanceof File) {
      //   formDataToSend.append("introVideo", introVideo);
      // }
      // formDataToSend.append("teacherIntro", teacherIntro);
      formDataToSend.append("description", courseDescription);
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/course/create`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("دوره با موفقیت ایجاد شد ✅");
        setVisible(true); // ← اضافه شد
        setTimeout(() => setSuccessMessage(""), 3000);

        // ریست فرم
        setCourseName("");
        setCourseDescription("");
        setCourseImage(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err);
      setSuccessMessage("خطا در ایجاد دوره ❌");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  
    setErrors({});
  };
  
  

  useEffect(() => {
    if (!successMessage) return;
  
    const fadeOutTimeout = setTimeout(() => {
      setVisible(false);
    }, 5000); // بعد ۵ ثانیه fade out
  
    const removeTimeout = setTimeout(() => {
      setSuccessMessage("");
    }, 6000); // بعد ۶ ثانیه حذف کامل پیام
  
    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(removeTimeout);
    };
  }, [successMessage]);
  

  return (
    <div className="flex flex-col justify-center items-center mt-5 sm:mt-0 w-full bg-[snow]">
      {successMessage && (
        <div
          className={`fixed top-[20%] left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-500 text-green-800 font-semibold py-3 px-6 rounded-[10px] z-50 shadow-lg transition-opacity duration-1000 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {successMessage}
        </div>
      )}

      <form
        dir="rtl"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-start items-center py-[15px] w-[90%] sm:w-[70%] bg-transparent my-[20px]"
      >
        <h3 className="text-[#2c5282] text-[22px]">افزودن دوره جدید</h3>

        {/* نام دوره */}
        <div className="w-[95%] mt-2 flex flex-col gap-2 justify-center items-start">
          <label htmlFor="courseName" className="text-[#222] text-[18px]">
            نام دوره
          </label>
          <input
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="مثال : آموزش فیگما"
            className="w-full px-[5px] h-[35px] border border-[#3073c1] outline-none rounded-[5px]"
            type="text"
          />
          {errors.courseName && (
            <span className="text-red-500 text-sm">{errors.courseName}</span>
          )}
        </div>

        <div className="w-[100%] sm:w-[120%] border-b border-[#3073c1] mt-3"></div>

        {/* عکس دوره */}
        <div className="w-[95%] mt-2 flex flex-col gap-2 justify-center items-start">
          <label htmlFor="courseImage" className="text-[#222] text-[18px]">
            افزودن عکس برای دوره
          </label>
          <input
            id="courseImage"
            type="file"
            ref={imageInputRef}
            accept="image/*"
            onChange={(e) => setCourseImage(e.target.files[0])}
            className="w-full px-[5px] h-[35px] border border-[#3073c1] outline-none rounded-[5px] cursor-pointer"
          />
        </div>

        <div className="w-[100%] sm:w-[120%] border-b border-[#3073c1] mt-3"></div>

        {/* ویدیوی معرفی دوره */}
        <div className="w-[95%] mt-2 flex flex-col gap-2 justify-center items-start">
          <label htmlFor="introVideo" className="text-[#222] text-[18px]">
            افزودن ویدیوی معرفی دوره <br />
            <span className="text-orange-400">
              (ویدیوی ۵ تا ۱۵ دقیقه‌ای که بعداً به عنوان ویدیوی معرفی استفاده
              می‌شود)
            </span>
          </label>
          <input
            id="introVideo"
            type="file"
            accept="video/*"
            onChange={(e) => setIntroVideo(e.target.files[0])}
            className="w-full px-[5px] h-[35px] border border-[#3073c1] outline-none rounded-[5px] cursor-pointer"
          />
          {errors.introVideo && (
            <span className="text-red-500 text-sm">{errors.introVideo}</span>
          )}
        </div>

        <div className="w-[100%] sm:w-[120%] border-b border-[#3073c1] mt-3"></div>

        {/* توضیحات دوره */}
        <div className="w-[95%] mt-2 flex flex-col gap-2 justify-center items-start">
          <label htmlFor="courseDescription" className="text-[#222] text-[18px]">
            توضیحات دوره
          </label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="مثال : تو این دوره جاوااسکریپت، قراره از صفر همه چیز رو یاد بگیری! اول با مبانی زبان آشنا می‌شی؛ مثل متغیرها، نوع داده‌ها، شرط‌ها و حلقه‌ها که پایه هر برنامه‌نویسی هستن. بعد می‌ریم سراغ مفاهیم مهم‌تر مثل توابع، آبجکت‌ها و آرایه‌ها تا بتونی داده‌ها رو به شکل حرفه‌ای مدیریت کنی. با این دوره می‌تونی....."
            className="w-full text-justify px-[5px] py-[5px] h-[200px] border border-[#3073c1] outline-none resize-none rounded-[5px]"
          />
          {errors.courseDescription && (
            <span className="text-red-500 text-sm">{errors.courseDescription}</span>
          )}
        </div>

        {/* دکمه ارسال */}
        <div className="w-full">
          <button
            type="submit"
            className="py-[5px] mr-4 mt-5 px-[8px] rounded-[3px] text-[snow] bg-[#2c5282] hover:bg-[#1a365d] cursor-pointer"
          >
            ارسال درخواست
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestToAddCourse;
