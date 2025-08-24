import { useState } from "react";
import { useUser } from "../../../Pages/coursesContext";

const EditProfile = () => {
  const { user, setUser } = useUser();
  const [tempUser, setTempUser] = useState(user); // کاربر موقت
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setTempUser({ ...tempUser, [name]: files[0] });
      e.target.value = ""; // ریست کردن input
    } else {
      setTempUser({ ...tempUser, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...tempUser };
  
    // اگر فایل جدید انتخاب شده بود تبدیل به URL کنیم
    if (tempUser.profileImg instanceof File) {
      updatedUser.profileImg = URL.createObjectURL(tempUser.profileImg);
    }
  
    setUser(updatedUser);
    setModalOpen(true)
    
  };
  

  return (
    <div className="w-full transition-all duration-300 flex flex-col gap-5 justify-center items-center pb-5">
      <h3 className="text-center text-[22px]">ویرایش پروفایل</h3>
      <form
        dir="rtl"
        onSubmit={handleSubmit}
        className="w-full sm:w-[80%] flex flex-col gap-5 justify-start items-end px-3 py-5 border border-[#1E3A8A] rounded-md shadow-ms shadow-[#1E3A8A]"
      >
        <div className="w-full flex flex-col gap-2">
          {tempUser.profileImg && (
            <img
              src={
                tempUser.profileImg instanceof File
                  ? URL.createObjectURL(tempUser.profileImg)
                  : tempUser.profileImg
              }
              alt="پروفایل"
              className="w-24 h-24 rounded-full border border-[#1E3A8A] mt-2 object-cover"
            />
          )}
          <label className="text-[18px]">عکس پروفایل</label>
          <input
            type="file"
            name="profileImg"
            onChange={handleChange}
            className="w-full border border-[#1E3A8A] rounded-md px-3 py-2 cursor-pointer"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[18px]">نام کاربری</label>
          <input
            type="text"
            name="studentNumber"
            value={tempUser.studentNumber || ""}
            onChange={handleChange}
            className="w-full border border-[#1E3A8A] rounded-md px-3 py-2 outline-none"
            />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[18px]">نام و نام خانوادگی</label>
          <input
            type="text"
            name="name"
            value={tempUser.name || ""}
            onChange={handleChange}
            className="w-full border border-[#1E3A8A] rounded-md px-3 py-2 outline-none"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-[18px]">ایمیل</label>
          <input
            type="email"
            name="email"
            value={tempUser.email || ""}
            onChange={handleChange}
            className="w-full border border-[#1E3A8A] rounded-md px-3 py-2 outline-none"
          />
        </div>
        <button
          type="submit"
          className="text-[#1E3A8A] px-2 py-1 border border-[#1E3A8A] rounded-md cursor-pointer hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
        >
          ذخیره تغییرات
        </button>
      </form>


      {/* Modal */}
      <div
        className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`w-[90%] sm:w-[35%] flex flex-col justify-center items-end bg-[snow] p-5 rounded-lg shadow-xl transform transition-all duration-300
            ${modalOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
        >
          <h2 className="text-lg font-semibold mb-2">تغییرات با موفقیت اعمال شدن</h2>
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-4 py-1 text-[17px] border border-[#1E3A8A] text-[#1E3A8A] rounded-md cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              تایید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
