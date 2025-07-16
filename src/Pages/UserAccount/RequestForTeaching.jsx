import { useEffect, useState } from "react";
import { UserInformation } from "../../Information/User";
import { useUser } from "../coursesContext";

const RequestForTeaching = () => {

  const { user } = useUser();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentNumber: "",
    profileImg: null,
    subject: "",
    experience: "",
    message: "",
    resume: null,
  });

  // مقداردهی وقتی user آمد
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        studentNumber: user.studentNumber || "",
      }));
    }
  }, [user]);


  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files) {
      // بررسی حجم عکس پروفایل
      if (name === "profileImg" && files[0]?.size > 2 * 1024 * 1024) {
        setIsError(true);
        setSuccessMessage("حجم عکس پروفایل نباید بیشتر از ۲ مگابایت باشد ❌");
        // setTimeout(() => setSuccessMessage(""), 3000);
        return;
      }
  
      // بررسی حجم رزومه (مثلاً تا 5 مگ)
      if (name === "resume" && files[0]?.size > 5 * 1024 * 1024) {
        setIsError(true);
        setSuccessMessage("حجم رزومه نباید بیشتر از ۵ مگابایت باشد ❌");
        // setTimeout(() => setSuccessMessage(""), 3000);
        return;
      }
  
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.experience || !formData.resume || !formData.profileImg) {
      setIsError(true);
      setSuccessMessage("لطفاً تمام فیلدهای ضروری را پر کنید ❌");
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }


    // ارسال داده‌ها به سرور یا هر عملیات لازم
    console.log("ارسال درخواست:", formData);
    setIsError(false);
    setSuccessMessage("درخواست شما با موفقیت ارسال شد ✅");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div dir="rtl" className="flex flex-col w-[70%] min-h-screen mb-[10px] border-2 border-[#3073c1] rounded-[10px] p-6 bg-transparent shadow-lg">
      <h2 className="text-2xl text-center text-[#3073c1] mb-6">فرم درخواست تدریس</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div className="flex flex-col gap-2">
            <label className="text-l font-medium">نام و نام خانوادگی</label>
            <input
            type="text"
            value={formData.fullName}
            disabled
            className="bg-gray-100 border border-[#3073c1] rounded-lg px-4 py-2 outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">ایمیل</label>
            <input
            type="email"
            value={formData.email}
            disabled
            className="bg-gray-100 border border-[#3073c1] rounded-lg px-4 py-2 outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">شماره دانشجویی</label>
            <input
            type="text"
            value={formData.studentNumber}
            disabled
            className="bg-gray-100 border border-[#3073c1] rounded-lg px-4 py-2 outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">عکس پروفایل (حداکثر 2MB)</label>
            <input
            type="file"
            name="profileImg"
            accept="image/*"
            onChange={handleChange}
            className="border border-[#3073c1] rounded-lg px-4 py-2 outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">درس‌هایی که می‌خواهید تدریس کنید</label>
            <input
            type="text"
            name="subject"
            placeholder="مثلاً ریاضیات، فیزیک، برنامه نویسی"
            value={formData.subject}
            onChange={handleChange}
            className="border border-[#3073c1] rounded-lg px-4 py-2 outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">بارگذاری رزومه (PDF، DOC)</label>
            <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="border border-[#3073c1] rounded-lg px-4 py-2 outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">تجربه تدریس یا مهارت های خود را بنویسید</label>
            <textarea
            name="experience"
            placeholder="توضیح درباره تجربه یا مهارت‌ها"
            rows={4}
            value={formData.experience}
            onChange={handleChange}
            className="border border-[#3073c1] rounded-lg px-4 py-2 resize-none outline-none"
            />
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-l font-medium mb-2">توضیحات تکمیلی (اختیاری)</label>
            <textarea
            name="message"
            placeholder="اگر نکته‌ای دارید اینجا بنویسید"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="border border-[#3073c1] rounded-lg px-4 py-2 resize-none outline-none"
            />
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#3073c1] cursor-pointer text-[snow] w-[max-content] py-2 px-3 rounded-[5px] hover:bg-[#265a9f] transition"
        >
          ارسال درخواست
        </button>

        {successMessage && (
          <p className={`text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default RequestForTeaching;
