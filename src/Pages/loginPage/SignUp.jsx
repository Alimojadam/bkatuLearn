import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios"




const Login=()=>{

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [text, setText]=useState('');


    const navigate = useNavigate();
      
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/loginPage');
    };



    const [UserID,setUserID]=useState('');
    const [password,setPassword]=useState('');
    const [ConfirmPassword,setConfirmPassword]=useState('')
    const [Email, setEmail]=useState('');
    const [studentNumber, setStudentNumber]=useState('');

    const handlePass = (e)=>{
        setPassword(e.target.value)
    }
    const handleConfirmPassword=(e)=>{
        setConfirmPassword(e.target.value)
    }
    const handleUserID = (e)=>{
        setUserID(e.target.value)
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handleStudentNumber=(e)=>{
        setStudentNumber(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (password !== ConfirmPassword) {
            setText("!رمز عبور و تکرار رمز عبور یکسان نیستند");
            return false;
        }
    
        if (password.length < 8 || password.length > 12) {
            setText("!رمز عبور باید بین ۸ تا ۱۲ کاراکتر باشد");
            return false;
        }
    
        try {
            await axios.post('https://bingo-web-pump-lm.trycloudflare.com/api/register', {
                UserID,
                password,
                Email,
                studentNumber,
            });
            setText("");
            return true;
        } catch (err) {
            setText("!خطا در ارسال اطلاعات");
            return false;
        }
    };
    
    const handleSignUP=async(e)=>{
        const isSuccess = await handleRegister(e);
        if (isSuccess) {
            navigate('/loginPage');
        }
    }
    return(
        <div className="loginPage flex justify-center items-center w-[100%] h-[100vh]">
            <div className="title w-[60%] h-[100%] flex flex-col justify-center items-center">
                <h1 className="text-[85px] font-bold text-[#3073c1]">WELCOME</h1>
                <p className="w-[53%] text-right text-[18px] text-[#3073c1] mr-[5px]">
                   : به اطلاع دانشجویان محترم میرساند <br />
                    لطفا اطلاعات خواسته شده را به درستی وارد کنید<br />
                    رمز عبور حداقل باید 8 کاراکتر و حداکثر 12 کاراکتر باشد
                </p>
            </div>
            <div className="login w-[40%] h-[100%] flex justify-center items-center flex-col">
                <div dir="rtl" className="form flex flex-col mb-4 justify-center items-start gap-[10px]">
                    <label htmlFor="username" className="text-[snow] mr-[10px]">نام و نام خانوادگی</label>
                    <input type="text" className="w-[90%] h-[30px] pr-[10px]" id="username" value={UserID} onChange={handleUserID}/>

                    <label htmlFor="studentNumber" className="text-[snow] mr-[10px]">شماره دانشجویی</label>
                    <input type="text" className="w-[90%] h-[30px] pr-[10px]" id="studentNumber" value={studentNumber} onChange={handleStudentNumber}/>

                    <label htmlFor="email" className="text-[snow] mr-[10px]">ایمیل</label>
                    <input type="email" className="w-[90%] h-[30px] pr-[10px]" id="email" value={Email} onChange={handleEmail}/>

                    <label htmlFor="password" className="text-[snow] mr-[10px]">رمز عبور</label>
                    <div className="relative w-[90%]">
                        <input id="password" className="w-full h-[30px] pr-[10px]" type={showPassword ? "text" : "password" }value={password} onChange={handlePass}/>
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
                        <input id="confirmPassword" className="w-full h-[30px] pr-[10px]" type={showConfirmPassword ? "text" : "password" } value={ConfirmPassword} onChange={handleConfirmPassword}/>
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
                            <a href="/loginPage" className="" onClick={handleSignUP}>ثبتنام</a>   
                        </div>
                        <div className="btnSignUp pt-[5px] pb-[8px] px-[24px] text-[#3073c1] bg-[snow]">
                            <a href="/loginPage" onClick={handleClick} className=" border-b border-[#3073c1]">ورود به حساب </a>
                        </div>

                    </div>
                </div>
                {text ?(
                            <p className="text-[snow] border-b border-[snow] ml-[30px]">{text}</p>
                        ):(
                            <p className="hidden">{text}</p>
                        )
                    }
                <a href="#" className="text-[snow] ml-[37px] mt-[20px] text-start border-b border-[snow]">نمیتوانید ثبتنام کنید؟</a>
            </div>
        </div>
    );
};
export default Login;