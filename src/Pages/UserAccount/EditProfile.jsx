import axios from "axios";
import { useState, useEffect } from "react";
import { UserInformation } from "../../Information/User";
import { useUser } from "../coursesContext";

const EditProfile = () => {

  const { user, setUser, loading } = useUser();
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name,
        email: user.email,
        studentNumber: user.studentNumber,
        study: user.study,
        university: user.university,
        aboutMe: user.aboutMe,
      });
      setProfileImage(user.profileImg || "");
      setPreviewImage(user.profileImg || "");
    }
  }, [user]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentNumber: "",
    study: "",
    university: "",
    aboutMe: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  
  
  
  const [successMessage, setSuccessMessage] = useState("");
    if (loading) return <p>در حال بارگذاری...</p>;
    if (!user) return <p>کاربری یافت نشد!</p>;
  

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
      setPreviewImage(URL.createObjectURL(file)); // پیش‌نمایش
      setProfileImage(file); // فایل واقعی برای ارسال
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSuccessMessage("همه فیلدهای الزامی باید پر شوند ❌");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("study", formData.study || "");
      formDataToSend.append("university", formData.university || "");
      formDataToSend.append("aboutMe", formData.aboutMe || "");
  
      if (profileImage && profileImage instanceof File) {
        formDataToSend.append("profile", profileImage);
      }
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/edit`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );
  
      const updatedUser = {
        ...user,
        name: formData.fullName,
        email: formData.email,
        study: formData.study,
        university: formData.university,
        aboutMe: formData.aboutMe,
        profileImg: profileImage instanceof File ? URL.createObjectURL(profileImage) : user.profileImg,
      };
      
      setUser(updatedUser);
      
      // فرم هم با همین داده آپدیت بشه:
      setFormData({
        fullName: updatedUser.name,
        email: updatedUser.email,
        studentNumber: updatedUser.studentNumber,
        study: updatedUser.study,
        university: updatedUser.university,
        aboutMe: updatedUser.aboutMe,
      });
      
      setPreviewImage(updatedUser.profileImg);
      
      
      setPreviewImage(response.data.user?.profile || "");
      setProfileImage(null); // اگه میخوای فایل انتخاب شده پاک بشه
      
      
      setSuccessMessage("اطلاعات با موفقیت ذخیره شدند ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
  
    } catch (err) {
      console.error("Axios Error:", err.response?.data || err);
      setSuccessMessage("خطا در ارسال اطلاعات ❌");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };
  
  
  
  

  return (
    <div
      dir="rtl"
      className="flex flex-col w-[90%] sm:w-[70%] min-h-screen mb-[10px] border-2 border-[#3073c1] rounded-[10px] p-6 bg-transparent shadow-lg"
    >
      <h2 className="text-2xl text-center text-[#3073c1] mb-6">ویرایش اطلاعات</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* پروفایل ایمیج */}
        <div className="flex flex-col">
          {previewImage && (
            <img
              src={previewImage}
              alt="پیش‌نمایش پروفایل"
              className="w-32 h-32 rounded-full object-cover border border-[#3073c1]"
            />
          )}
          <label htmlFor="" className="text-l font-medium mb-2">عکس پروفایل (اختیاری)</label>
          <input
            type="file"
            accept="image/*"
            name="profileImage"
            onChange={handleImageChange}
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2 cursor-pointer text-[#444]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">شماره دانشجویی</label>
          <input
            type="text"
            name="studentNumber"
            value={formData.studentNumber}
            disabled
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">نام و نام خانوادگی</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">ایمیل</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">رشته تحصیلی</label>
          <input
            type="text"
            name="study"
            value={formData.study}
            placeholder="اختیاری"
            onChange={handleChange}
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">دانشگاه محل تحصیل</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            placeholder="اختیاری"
            onChange={handleChange}
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">درباره من</label>
          <textarea
            name="aboutMe"
            value={formData.aboutMe}
            placeholder="در حد 40 کلمه درمورد خودت بگو :) "
            onChange={handleChange}
            className="bg-transparent border border-[#3073c1] rounded-lg px-4 py-2 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#3073c1] cursor-pointer text-[snow] w-[max-content] py-2 px-3 rounded-[5px] hover:bg-[#265a9f] transition"
        >
          ذخیره تغییرات
        </button>

        {successMessage && (
          <p className="mt-4 text-green-600 font-medium text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
