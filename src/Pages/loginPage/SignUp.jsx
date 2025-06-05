import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';




const Login=()=>{

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const navigate = useNavigate();
      
    const handleClick = (e) => {
        e.preventDefault(); // جلوگیری از رفرش شدن صفحه
        navigate('/loginPage'); // رفتن به صفحه لاگین
    };



    return(
        <div className="loginPage flex justify-center items-center w-[100%] h-[100vh]">
            <div className="title w-[60%] h-[100%] flex flex-col justify-center items-center">
                <h1 className="text-[85px] font-bold text-[#3073c1]">WELCOME</h1>
                <p className="w-[53%] text-right text-[18px] text-[#3073c1] mr-[5px]">
                   : به اطلاع دانشجویان محترم میرساند <br />
                    لطفا ایمیل و رمز عبور خود را انتخاب کنید<br />
                    رمز عبور حداقل باید 8 کاراکتر و حداکثر 12 کاراکتر باشد
                </p>
            </div>
            <div className="login w-[40%] h-[100%] flex justify-center items-center flex-col gap-[20px]">
                <div dir="rtl" className="form flex flex-col mb-4 justify-center items-start gap-[10px]">
                    <label htmlFor="email" className="text-[snow] mr-[10px]">ایمیل</label>
                    <input type="email" className="w-[90%] h-[30px] pr-[10px]" id="email" />

                    <label htmlFor="password" className="text-[snow] mr-[10px]">رمز عبور</label>
                    <div className="relative w-[90%]">
                        <input id="password" className="w-full h-[30px] pr-[10px]" type={showPassword ? "text" : "password"}/>
                        <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute top-[3px] left-2 text-[#3073c1]">
                            {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                            ) : (
                            <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>

                    <label htmlFor="confirmPassword" className="text-[snow] mr-[10px]">تکرار رمز عبور</label>
                    <div className="relative w-[90%]">
                        <input id="confirmPassword" className="w-full h-[30px] pr-[10px]" type={showConfirmPassword ? "text" : "password"}/>
                        <button type="button" onClick={() => setShowConfirmPassword(prev => !prev)} className="absolute top-[3px] left-2 text-[#3073c1]">
                            {showConfirmPassword ? (
                            <i className="fas fa-eye-slash"></i>
                            ) : (
                            <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>


                    <div className="formBtn w-[100%] flex justify-start items-center gap-[5px]">
                        <div className="btnLogin pt-[4px] pb-[9px] px-[24px] text-[#3073c1] bg-[snow]">
                            <a href="#" className="">ثبتنام</a>   
                        </div>
                        <div className="btnSignUp pt-[5px] pb-[8px] px-[24px] text-[#3073c1] bg-[snow]">
                            <a href="/loginPage" onClick={handleClick} className=" border-b border-[#3073c1]">ورود به حساب </a>
                        </div>

                    </div>
                </div>
                <a href="#" className="text-[snow] ml-[37px] border-b border-[snow]">نمیتوانید ثبتنام کنید؟</a>
            </div>
        </div>
    );
};
export default Login;