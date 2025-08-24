import { useState } from "react";
import { useUser } from "../../../Pages/coursesContext";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user, setUser } = useUser();
  const [modalOpen, setModalOpen] = useState(false);

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
      setModalOpen(true);
      setMessage({ text: "لطفاً همه فیلدها را پر کنید ❌", type: "error" });
      return;
    }
  
    if (formData.currentPassword !== String(user.password)) {
      setModalOpen(true);
      setMessage({ text: "رمز فعلی نادرست است ❌", type: "error" });
      return;
    }
  
    // ⬅️ بررسی طول رمز جدید
    if (formData.newPassword.length < 8 || formData.newPassword.length > 12) {
      setModalOpen(true);
      setMessage({ text: "رمز عبور باید بین ۸ تا ۱۲ کاراکتر باشد ❌", type: "error" });
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
        setModalOpen(true);
      setMessage({ text: "رمز جدید و تکرار آن مطابقت ندارند ❌", type: "error" });
      return;
    }
  
      // ذخیره در context (و احتمالا localStorage یا API)
    const updatedUser = { ...user, password: Number(formData.newPassword) };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); 
    setModalOpen(true);
    setMessage({ text: "رمز عبور با موفقیت تغییر یافت ✅", type: "success" });
  
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
  };
  
  const iconClass ="text-[#1E3A8A] text-center text-[18px] cursor-pointer";

  return (
    <div className="w-full transition-all duration-300 flex flex-col gap-5 justify-center items-center pb-5 sm:pb-0">
      <h2 className="text-center text-[22px]">تغییر رمز عبور</h2>
      <form dir="rtl" className="w-full sm:w-[80%] flex flex-col gap-5 " onSubmit={handleSubmit}>
        <div className="w-full flex flex-col border-b-2 border-[#1E3A8A] pb-[30px]">
          <label className="text-l font-medium mb-2">رمز عبور فعلی</label>
          <div className="w-full flex justify-center items-center bg-transparent border border-[#1E3A8A] rounded-lg px-4 py-2">
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
          <div className="w-full flex justify-center items-center bg-transparent border border-[#1E3A8A] rounded-lg px-4 py-2">
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
          <div className="w-full flex justify-center items-center bg-transparent border border-[#1E3A8A] rounded-lg px-4 py-2">
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
          className="w-[max-content] text-[#1E3A8A] px-4 py-1 border border-[#1E3A8A] rounded-md cursor-pointer hover:bg-[#1E3A8A] hover:text-white transition-all duration-300"
        >
          تغییر رمز
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
          <p
            className={`text-center text-[17px] font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
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

export default ChangePass;
