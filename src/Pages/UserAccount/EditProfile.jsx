import { useState } from "react";
import { UserInformation } from "../../Information/User";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: UserInformation[0].name,
    email: UserInformation[0].email,
    studentNumber: UserInformation[0].studentNumber,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim()) {
        setSuccessMessage("همه فیلدها باید پر شوند ❌");
        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
        return;
      }

    UserInformation[0] = {
      name: formData.fullName,
      email: formData.email,
      studentNumber: formData.studentNumber,
      password: UserInformation[0].password,
    };

    setSuccessMessage("اطلاعات با موفقیت تغییر یافتند ✅");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div dir="rtl" className="flex flex-col w-[70%] h-[85vh] border-2 border-[#3073c1] rounded-[10px] p-6 bg-transparent shadow-lg">
      <h2 className="text-2xl text-center text-[#3073c1] mb-6">ویرایش اطلاعات</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
