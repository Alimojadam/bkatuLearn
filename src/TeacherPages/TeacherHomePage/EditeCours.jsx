// EditCoursePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cards } from '../../Pages/coursPage/CardsInfo';

const EditeCourse = () => {
  const { id } = useParams();
  const courseId = parseInt(id);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const foundCourse = cards.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      alert("دوره پیدا نشد!");
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("اطلاعات جدید:", course);
    alert("اطلاعات با موفقیت ذخیره شد!");

    navigate(`/CoursPage/${courseId}`);
  };

  if (!course) return <div>در حال بارگذاری...</div>;

  return (
    <div className="p-8 w-full flex justify-start items-center flex-col gap-3 bg-[#eef3f9] min-h-screen">
      <h2 className="text-2xl text-[#111] mb-6 text-center">ویرایش دوره</h2>
      <form dir='rtl' onSubmit={handleSubmit} className="w-[90%] sm:w-[50%] flex flex-col gap-3 justify-center items-center">
        <div className="w-full flex flex-col gap-2">
            <label className=" text-right text-[17px] text-[#111]">
            عنوان دوره
            </label>
            <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                className="border px-3 py-2 rounded outline-none border-[#3073c1]"
            />
        </div>

        <div className="w-[120%] border-b border-[#3073c1] mt-4"></div>

        <div className="w-full flex flex-col gap-2">
            <label className="text-right  text-[17px] text-[#111]">
            درباره دوره
            </label>
            <textarea
                name="aboutCourse"
                value={course.aboutCourse}
                onChange={handleChange}
                className="border px-3 py-2 rounded h-50 outline-none border-[#3073c1]"
            />
        </div>

        <div className="w-[120%] border-b border-[#3073c1] mt-4"></div>

        <div className="w-full flex flex-col gap-2">
            <label className="text-right  text-[17px] text-[#111]">
            درباره خودتان در این دوره
            </label>
            <textarea
                name="aboutTeacherCourse"
                value={course.aboutTeacherCourse}
                onChange={handleChange}
                className="border px-3 py-2 rounded h-50 outline-none border-[#3073c1]"
            />
        </div>

        <div className="w-full mt-5">
            <button
            type="submit"
            className="border border-[#3073c1] text-[#3073c1] py-2 px-4 rounded hover:bg-[#3073c1] hover:text-[snow] transition cursor-pointer"
            >
            ذخیره تغییرات
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditeCourse;


