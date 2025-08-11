import React, { useEffect, useState } from "react";

const RequestToAddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [introVideo, setIntroVideo] = useState(null);
  const [teacherIntro, setTeacherIntro] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // اعتبارسنج
    if (!courseName.trim()) newErrors.courseName = "نام دوره الزامی است.";
    if (!introVideo) newErrors.introVideo = "ویدیوی معرفی دوره الزامی است.";
    if (!teacherIntro.trim()) newErrors.teacherIntro = "لطفاً درباره خودتان توضیح دهید.";
    if (!courseDescription.trim()) newErrors.courseDescription = "توضیحات دوره الزامی است.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("courseName", courseName);
    if (courseImage) formData.append("courseImage", courseImage);
    formData.append("introVideo", introVideo);
    formData.append("teacherIntro", teacherIntro);
    formData.append("courseDescription", courseDescription);

    // console.log("ارسال شد:");
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": ", pair[1]);
    // }

    // نمایش پیام موفقیت و شروع انیمیشن fade-in
    setSuccessMessage(
      "درخواست شما با موفقیت ثبت شد و بعد از تایید میتونید شروع به تدریس کنید ✅"
    );
    setVisible(true);
    setErrors({});

    // پاک کردن فرم
    setCourseName("");
    setCourseImage(null);
    setIntroVideo(null);
    setTeacherIntro("");
    setCourseDescription("");
  };

  // fade out و حذف پیام بعد از زمان مشخص
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
        <h3 className="text-[#2c5282] text-[22px]">درخواست افزودن دوره</h3>

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
            افزودن عکس برای دوره (اختیاری)
          </label>
          <input
            id="courseImage"
            type="file"
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

        {/* معرفی مدرس */}
        <div className="w-[95%] mt-2 flex flex-col gap-2 justify-center items-start">
          <label htmlFor="teacherIntro" className="text-[#222] text-[18px]">
            توضیحاتی در مورد خودتان در این دوره
          </label>
          <textarea
            id="teacherIntro"
            value={teacherIntro}
            onChange={(e) => setTeacherIntro(e.target.value)}
            placeholder="مثال: سلام! من علی رضایی هستم، مدرس دوره جاوااسکریپت. سال‌هاست که عاشق برنامه‌نویسی‌ام و مخصوصاً جاوااسکریپت رو خیلی دوست دارم. از وقتی که با این زبان شروع کردم، فهمیدم چقدر می‌تونه دنیای وب رو جذاب‌تر و ساده‌تر کنه. توی این دوره سعی کردم همه چیز رو به زبون ساده و خودمونی آموزش بدم، بدون اینکه خسته‌کننده باشه. کلی پروژه عملی داریم که باهاشون می‌تونی هم یاد بگیری هم تمرین کنی. هدفم اینه که....."
            className="w-full text-justify px-[5px] py-[5px] h-[200px] border border-[#3073c1] outline-none rounded-[5px] resize-none"
          />
          {errors.teacherIntro && (
            <span className="text-red-500 text-sm">{errors.teacherIntro}</span>
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
