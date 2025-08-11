import { useEffect, useState } from "react";
import { useUser } from "../../Pages/coursesContext";
import { teachers } from "../../Pages/teachers/TeacherInfo";

const EditProfile = () => {
  const { user, setUser } = useUser();

  const teacher = user;

  // گرفتن aboutTeacher جدید از آرایه teachers
  const aboutTeacherFromTeachers = teachers.find(t => t.id === teacher?.id)?.aboutTeacher || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNumber: "",
    study: "",
    university: "",
    aboutTeacher: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || "",
        email: teacher.email || "",
        studentNumber: teacher.studentNumber || "",
        study: teacher.study || "",
        university: teacher.university || "",
        // اگر teacher.aboutTeacher بود، از اون استفاده می‌کنیم؛ در غیر اینصورت مقدار جدید رو از آرایه teachers
        aboutTeacher: teacher.aboutTeacher || aboutTeacherFromTeachers || "",
      });

      setProfileImage(teacher.profileImg || "");
      setPreviewImage(teacher.profileImg || "");
    }
  }, [teacher, aboutTeacherFromTeachers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name ? formData.name.trim() : "";
    const email = formData.email ? formData.email.trim() : "";
    const studentNumber = formData.studentNumber ? formData.studentNumber.toString().trim() : "";
    const study = formData.study ? formData.study.trim() : "";
    const university = formData.university ? formData.university.trim() : "";
    const aboutTeacher = formData.aboutTeacher ? formData.aboutTeacher.trim() : "";

    if (!name || !email || !studentNumber || !study || !university || !aboutTeacher) {
      setSuccessMessage("همه فیلدهای الزامی باید پر شوند ❌");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    const updatedTeacher = {
      ...teacher,
      name,
      email,
      studentNumber,
      study,
      university,
      aboutTeacher: aboutTeacher,
      profileImg: profileImage,
    };

    setUser(updatedTeacher);
    localStorage.setItem("user", JSON.stringify(updatedTeacher));

    setSuccessMessage("اطلاعات با موفقیت ذخیره شدند ✅");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  if (!teacher) {
    return (
      <div className="text-center py-10 text-[#3073c1]">
        در حال بارگذاری اطلاعات کاربر...
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full bg-[snow] min-h-screen flex flex-col justify-center items-center py-[15px] mt-5 sm:mt-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-[20px] gap-4 justify-start items-center w-[90%] sm:w-[70%] border-2 border-[#2c5282] rounded-[10px]"
      >
        <h3 className="text-[21px] text-[#2c5282]">ویرایش حساب مدرس</h3>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">نام و نام خانوادگی</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full outline-none border border-[#3073c1] rounded-[5px] px-[5px] h-[35px]"
            type="text"
          />
        </div>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">شماره دانشجویی</label>
          <input
            name="studentNumber"
            value={formData.studentNumber}
            disabled
            className="w-full bg-gray-100 cursor-not-allowed outline-none border border-[#3073c1] rounded-[5px] px-[5px] h-[35px]"
            type="text"
          />
        </div>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">عکس پروفایل</label>
          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="w-full outline-none border border-[#3073c1] rounded-[5px] px-[5px] h-[35px] cursor-pointer"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="پیش‌نمایش"
              className="w-[100px] h-[100px] rounded-full border mt-2"
            />
          )}
        </div>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">ایمیل</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none border border-[#3073c1] rounded-[5px] px-[5px] h-[35px]"
            type="email"
          />
        </div>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">رشته تحصیلی</label>
          <input
            name="study"
            value={formData.study}
            onChange={handleChange}
            className="w-full outline-none border border-[#3073c1] rounded-[5px] px-[5px] h-[35px]"
            type="text"
          />
        </div>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">دانشگاه محل تحصیل</label>
          <input
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="w-full outline-none border border-[#3073c1] rounded-[5px] px-[5px] h-[35px]"
            type="text"
          />
        </div>

        <div className="w-[97%] flex flex-col gap-2">
          <label className="text-[#222] text-[17px]">درباره مدرس</label>
          <textarea
            name="aboutTeacher"
            value={formData.aboutTeacher}
            onChange={handleChange}
            placeholder="چند جمله در مورد خودت و توانایی‌هایی که داری بگو :)"
            className="w-full outline-none border border-[#3073c1] rounded-[5px] px-[5px] pt-[5px] h-[80px] resize-none"
          />
        </div>

        <div className="w-[97%]">
          <button
            type="submit"
            className="bg-[#2c5282] hover:bg-[#1a365d] text-[17px] text-[snow] rounded-[5px] px-[20px] py-[5px] cursor-pointer"
          >
            ثبت
          </button>
        </div>

        {successMessage && (
          <p className="text-green-600 text-[15px] text-center mt-2">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
