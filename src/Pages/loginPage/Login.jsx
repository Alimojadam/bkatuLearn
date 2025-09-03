import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInformation } from "../../Information/User";
import { user,useUser } from "../coursesContext";  // فرض بر این است که از این hook برای ذخیره‌سازی داده‌های کاربر استفاده می‌کنید.
import './Login.css';
import Userimg from "../img/userIMG.jpg"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useUser(); // ✅ درست
 // فرض بر این است که این hook کاربر فعلی را در context ذخیره می‌کند.
  

  const SignUphandleClick = (e) => {
    e.preventDefault();
    navigate('/SignUpPage');
  };

  useEffect(() => {
    if (user?.type) {
      navigate(user.type === "Admin" ? "/AdminPanel" : "/CoursesPage");
    }
  }, [user, navigate]);

  const SignInhandleClick = async (e) => {
    e.preventDefault();
  
    const trimmedStudentNumber = studentNumber.trim();
    const trimmedPassword = password.trim();
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        { UserID: trimmedStudentNumber, password: trimmedPassword },
        { withCredentials: true } // حتما باید اضافه شود
      );
      console.log(response);

      
      if (response.status === 200 || response.status === 201) {
        const newUser=response.data.user

        setUser({
          ...user,
          coursesId : newUser.CourseId,
          name: newUser.name,
          studentNumber : newUser.UserID ,
          type : newUser.role,
          profileImg : newUser.profilePic || Userimg,
          email : newUser.email,
        });
        console.log(user)
          
        
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("!شماره دانشجویی یا رمز عبور اشتباه است");
      } else {
        setError("!خطا در ورود به سیستم");
      }
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
