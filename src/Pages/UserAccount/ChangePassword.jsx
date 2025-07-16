import { useState } from "react";
import { UserInformation } from "../../Information/User";
import { useUser } from "../coursesContext";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user, setUser } = useUser();

  const [message, setMessage] = useState({ text: "", type: "" });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    if (
      !formData.currentPassword.trim() ||
      !formData.newPassword.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setMessage({ text: "لطفاً همه فیلدها را پر کنید ❌", type: "error" });
      return;
    }
  
    if (formData.currentPassword !== String(user.password)) {
      setMessage({ text: "رمز فعلی نادرست است ❌", type: "error" });
      return;
    }
  
    // ⬅️ بررسی طول رمز جدید
    if (formData.newPassword.length < 8 || formData.newPassword.length > 12) {
      setMessage({ text: "رمز عبور باید بین ۸ تا ۱۲ کاراکتر باشد ❌", type: "error" });
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: "رمز جدید و تکرار آن مطابقت ندارند ❌", type: "error" });
      return;
    }
  
      // ذخیره در context (و احتمالا localStorage یا API)
    const updatedUser = { ...user, password: Number(formData.newPassword) };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); 
    setMessage({ text: "رمز عبور با موفقیت تغییر یافت ✅", type: "success" });
  
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };
  
  const iconClass ="text-[#3073c1] text-center text-[18px] cursor-pointer";

  return (
    <div dir="rtl" className="flex flex-col w-[70%] h-[85vh] rounded-[10px] p-6 bg-transparent">
      <h2 className="text-2xl text-center text-[#3073c1] mb-6">تغییر رمز عبور</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col border-b-2 border-[#3073c1] pb-[30px]">
          <label className="text-l font-medium mb-2">رمز عبور فعلی</label>
          <div className="w-full flex justify-center items-center bg-transparent border border-[#3073c1] rounded-lg px-4 py-2">
            <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full focus:outline-none"
            />
            <i
                className={`fas ${showPassword.current ? "fa-eye-slash" : "fa-eye"} ${iconClass}`}
                onClick={() => togglePassword("current")}
            ></i>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">رمز عبور جدید</label>
          <div className="w-full flex justify-center items-center bg-transparent border border-[#3073c1] rounded-lg px-4 py-2">
            <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full focus:outline-none"
            />
            <i
                className={`fas ${showPassword.new ? "fa-eye-slash" : "fa-eye"} ${iconClass}`}
                onClick={() => togglePassword("new")}
            ></i>
          </div>

        </div>

        <div className="flex flex-col">
          <label className="text-l font-medium mb-2">تکرار رمز جدید</label>
          <div className="w-full flex justify-center items-center bg-transparent border border-[#3073c1] rounded-lg px-4 py-2">
            <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full focus:outline-none"
            />
            <i
                className={`fas ${showPassword.confirm ? "fa-eye-slash" : "fa-eye"} ${iconClass}`}
                onClick={() => togglePassword("confirm")}
            ></i>
          </div>

        </div>

        <button
          type="submit"
          className="mt-4 bg-[#3073c1] text-white w-[max-content] cursor-pointer py-2 px-4 rounded hover:bg-[#265a9f] transition"
        >
          تغییر رمز
        </button>

        {/* پیام موفقیت یا خطا */}
        {message.text && (
          <p
            className={`mt-4 text-center font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
