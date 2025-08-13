import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInformation } from "../../Information/User";
import { useUser } from "../coursesContext";  // فرض بر این است که از این hook برای ذخیره‌سازی داده‌های کاربر استفاده می‌کنید.
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();  // فرض بر این است که این hook کاربر فعلی را در context ذخیره می‌کند.

  const SignUphandleClick = (e) => {
    e.preventDefault();
    navigate('/SignUpPage');
  };

  const SignInhandleClick = (e) => {
    e.preventDefault();

    const trimmedStudentNumber = studentNumber.trim(); // حذف فضای اضافی
    const trimmedPassword = password.trim(); // حذف فضای اضافی

    // ارسال اطلاعات به سرور برای احراز هویت
    // try {
    //   const response = await axios.post('http://your-backend-url/api/login', {
    //     studentNumber: trimmedStudentNumber,
    //     password: trimmedPassword,
    // });
    // if (response.status === 200) {
    //     const { token, user } = response.data;  // فرض بر این است که سرور توکن و اطلاعات کاربر را ارسال می‌کند
        
    //     // ذخیره توکن در localStorage برای استفاده در درخواست‌های بعدی
    //     localStorage.setItem('authToken', token);

    //     // ذخیره اطلاعات کاربر در وضعیت global یا localStorage
    //     localStorage.setItem('user', JSON.stringify(user));

    //     // ذخیره کاربر فعلی در context
    //     setUser(user);

    //     // هدایت کاربر به صفحه مربوطه
    //     if (user.type === "Admin") {
    //       navigate("/AdminPanel");
    //     } else {
    //       navigate("/CoursesPage");
    //     }
    //   } else {
    //     setError("!شماره دانشجویی یا رمز عبور اشتباه است");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setError("!خطا در ورود به سیستم");
    // }

    // خواندن داده‌های کاربران از localStorage
    const users = JSON.parse(localStorage.getItem('UserInformation')) || [];
    let allUsers = [...users, ...UserInformation];


    // پیدا کردن کاربر با استفاده از شماره دانشجویی و رمز عبور
    const foundUser = allUsers.find(
      (user) =>
        user.studentNumber.toString() === trimmedStudentNumber &&
        user.password.toString() === trimmedPassword
    );

    if (foundUser) {
      setUser(foundUser); // ذخیره کاربر فعلی در context (برای دسترسی در دیگر صفحات)
      localStorage.setItem("user", JSON.stringify(foundUser)); // ذخیره کاربر واقعی در localStorage

      // هدایت کاربر به صفحه مربوطه
      if (foundUser.type === "Admin") {
        navigate("/AdminPanel");
      } else {
        navigate("/CoursesPage");
      }
    } else {
      setError("!شماره دانشجویی یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="loginPage pb-4 gap-8 sm:pb-0 sm:gap-0 bg-[#eef3f9] flex flex-col sm:flex-row justify-center items-center w-[100%] min-h-screen sm:h-[100vh]">
      <div className="title w-[100%] sm:w-[60%] h-[100%] flex flex-col justify-center items-center">
        <h1 className="text-[65px] sm:text-[85px] font-bold text-[#3073c1]">WELCOME</h1>
        <p className="sm:w-[51%] text-right text-[16px] sm:text-[18px] text-[#3073c1] mr-[5px]">
          : به اطلاع دانشجویان محترم میرساند <br />
          نام کاربری شما همان شماره دانشجویی شما می باشد <br />
          و رمز عبور هر شخص موقع ثبتنام ثبت شده است
        </p>
      </div>
      <div className="login bg-[#eef3f9] sm:bg-[#3073c1] w-[100%] sm:w-[40%] h-[100%] flex justify-center items-center flex-col gap-2 sm:gap-[20px]">
        <form dir="rtl" onSubmit={SignInhandleClick} className="form flex flex-col mb-4 justify-center items-start gap-[10px]">
          <label htmlFor="userName" className="text-[#3073c1] sm:text-[snow] mr-[10px]">نام کاربری</label>
          <input
            id="userName"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            className="w-[90%] h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none"
            type="text"
          />

          <label htmlFor="password" className="text-[#3073c1] sm:text-[snow]  mr-[10px]">رمز عبور</label>
          <div className="relative w-[90%]">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-[3px] left-2 text-[#3073c1]"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>

          <div className="formBtn w-[90%] flex justify-between sm:justify-start items-center sm:gap-[5px]">
            <button type="submit" className="cursor-pointer btnLogin pt-[4px] pb-[9px] px-[20px] text-[#3073c1] bg-[snow] border border-[#3073c1] sm:border-none">ورود</button>

            <button
              type="button"
              onClick={SignUphandleClick}
              className="cursor-pointer btnSignUp pt-[5px] pb-[8px] px-[13px] sm:px-[20px] text-[#3073c1] bg-[snow] border sm:border-b border-[#3073c1] "
            >
              ایجاد حساب جدید
            </button>
          </div>
        </form>
        <a href="#" className="text-[#3073c1]  sm:text-[snow] ml-[37px] border-b border-[#3073c1] sm:border-[snow]">نمیتوانید وارد شوید؟</a>
        {error && <p className="text-[#3073c1] sm:text-[snow] border-b border-[#3073c1] sm:border-[snow] pb-1 text-x mt-3 ml-[37px]">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
