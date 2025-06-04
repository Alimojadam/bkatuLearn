import React, { useState } from "react";
import './Login.css';




const Login=()=>{

    const [showPassword, setShowPassword] = useState(false);


    return(
        <div className="loginPage flex justify-center items-center w-[100%] h-[100vh]">
            <div className="title w-[60%] h-[100%] flex flex-col justify-center items-center">
                <h1 className="text-[70px] font-bold text-[#3073c1]">WELCOME</h1>
                <p className="w-[50%] text-right text-[17px] text-[#3073c1] mr-[50px]">
                   : به اطلاع دانشجویان محترم میرساند <br />
                    نام کاربری شما همان شماره دانشجویی شما بوده <br />
                    و رمز عبور هر فرد نیز معادل کدملی وی می باشد
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

                    <a href="#" className="btnLogin pt-[3px] pb-[8px] px-[15px] text-[#3073c1] bg-[snow] text-center mr-[5px]">ورود</a>
                </div>
                <a href="#" className="text-[snow] ml-[20px]">نمیتوانید وارد شوید؟</a>
            </div>
        </div>
    );
};
export default Login;