import axios from "axios";
import { useState, useEffect } from "react";
import { UserInformation } from "../../Information/User";
import { useUser } from "../coursesContext";

const EditProfile = () => {

  let {user,setUser}=useUser();

  const [formData, setFormData] = useState({
    fullName: user.name,
    email: user.email,
    studentNumber: user.studentNumber,
    study: user.study || "",
    university: user.university || "",
    aboutMe: user.aboutMe || "",
  });

  const [profileImage, setProfileImage] = useState(user.profileImg || "");
  const [previewImage, setPreviewImage] = useState(user.profileImg || "");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSuccessMessage("همه فیلدهای الزامی باید پر شوند ❌");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    try{

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/edit`,
        { 
          profile : profileImage,
          name : formData.fullName ,
          email : formData.email, 
          study : formData.study, 
          university : formData.university, 
          aboutMe : formData.aboutMe,
        },
        { withCredentials: true } // حتما باید اضافه شود
      );
      if (response.status === 200 || response.status === 201) {

        setUser(prevUser => ({
          ...prevUser,
          ...response.data.user,
        }));
        setSuccessMessage("اطلاعات با موفقیت ذخیره شدند ✅");
        setTimeout(() => setSuccessMessage(""), 3000);
      }

    }catch(err){
      if (err.response && err.response.status === 401) {
        setSuccessMessage("خطا در ارسال اظلاعات")
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }

    // const updatedUser = {
    //   ...user,
    //   name: formData.fullName,
    //   email: formData.email,
    //   studentNumber: formData.studentNumber,
    //   study: formData.study,
    //   university: formData.university,
    //   aboutMe: formData.aboutMe,
    //   profileImg: profileImage,
    // };

    // setUser(updatedUser);

    
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
