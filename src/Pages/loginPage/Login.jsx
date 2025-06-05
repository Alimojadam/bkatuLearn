import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';




const Login=()=>{

    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();
      
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/SignUpPage');
    };

    return(
        <div className="loginPage flex justify-center items-center w-[100%] h-[100vh]">
            <div className="title w-[60%] h-[100%] flex flex-col justify-center items-center">
                <h1 className="text-[85px] font-bold text-[#3073c1]">WELCOME</h1>
                <p className="w-[51%] text-right text-[18px] text-[#3073c1] mr-[5px]">
                   : به اطلاع دانشجویان محترم میرساند <br />
                    نام کاربری شما همان شماره دانشجویی شما می باشد <br />
                    و رمز عبور هر شخص موقع ثبتنام ثبت شده است
                </p>
            </div>
            <div className="login w-[40%] h-[100%] flex justify-center items-center flex-col gap-[20px]">
                <div dir="rtl" className="form flex flex-col mb-4 justify-center items-start gap-[10px]">
                    <label htmlFor="userName" className="text-[snow] mr-[10px]">نام کاربری</label>
                    <input id="userName" className="w-[90%] h-[30px] pr-[10px]" type="text" />

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

                    <div className="formBtn w-[100%] flex justify-start items-center gap-[5px]">
                        <div className="btnLogin pt-[4px] pb-[9px] px-[20px] text-[#3073c1] bg-[snow]">
                            <a href="#" className="">ورود</a>   
                        </div>
                        <div className="btnSignUp pt-[5px] pb-[8px] px-[20px] text-[#3073c1] bg-[snow]">
                            <a href="/SignUpPage" onClick={handleClick} className=" border-b border-[#3073c1]">ایجاد حساب جدید</a>
                        </div>

                    </div>
                </div>
                <a href="#" className="text-[snow] ml-[37px] border-b border-[snow]">نمیتوانید وارد شوید؟</a>
            </div>
        </div>
    );
};
export default Login;