import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { UserInformation } from "../../Information/User";
import axios from "axios"




const SignUp=()=>{

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

        // بررسی اینکه تمام فیلدها پر شده‌اند
        if (!UserID || !studentNumber || !Email || !password || !ConfirmPassword) {
            setText("!لطفاً تمام فیلدها را پر کنید");
            return;
        }

        // بررسی مطابقت رمز عبور و تکرار رمز عبور
        if (password !== ConfirmPassword) {
            setText("!رمز عبور و تکرار رمز عبور یکسان نیستند");
            return false;
        }

        // بررسی طول رمز عبور
        if (password.length < 8 || password.length > 12) {
            setText("!رمز عبور باید بین ۸ تا ۱۲ کاراکتر باشد");
            return false;
        }

        // ایجاد یک کاربر جدید با داده‌های وارد شده
        const newUser = {
            id: Date.now(),
            name: UserID,
            studentNumber,
            type: "User",
            profileImg: "",
            email: Email,
            password,
            study: "",
            university: "",
            aboutMe: "",
            aboutTeacher: "",
            corsesId: [],
        };

        try {
            // ابتدا کاربران را از localStorage می‌خوانیم
            let usersFromLocalStorage = JSON.parse(localStorage.getItem('UserInformation')) || [];

            // ترکیب کاربران از localStorage و کاربران پیش‌تعریف شده در UserInformation
            let allUsers = [...usersFromLocalStorage, ...UserInformation];

            // بررسی وجود کاربر با شماره دانشجویی مشابه در تمامی کاربران
            const userExists = allUsers.some(user => user.studentNumber === studentNumber);
            if (userExists) {
                setText("!این شماره دانشجویی قبلاً ثبت شده است");
                return false;
            }

            // بررسی وجود کاربر با ایمیل مشابه در تمامی کاربران
            const userEmail = allUsers.some(user => user.email === Email);
            if (userEmail) {
                setText("!این ایمیل قبلاً ثبت شده است");
                return false;
            }

            // ارسال اطلاعات کاربر جدید سمت بکند و دریافت توکن
            
            // const response = await axios.post('http://your-backend-url/api/users', newUser);
            // if (response.status === 200) {
            //     const { token } = response.data;
                
            //     // ذخیره توکن در localStorage برای احراز هویت در درخواست‌های بعدی
            //     localStorage.setItem('authToken', token);
            

                // افزودن کاربر جدید به لیست کاربران
                allUsers.push(newUser);

                // ذخیره‌سازی لیست کاربران به روز شده در localStorage
                localStorage.setItem('UserInformation', JSON.stringify(allUsers));
                

                setText("ثبت‌نام با موفقیت انجام شد"); 
                return true;
            // } 
        } catch (err) {
            setText("!خطا در ارسال اطلاعات");
            return false;
        }
    };

    
    
    
    
    const handleSignUP=async(e)=>{
        e.preventDefault();
        const isSuccess = await handleRegister(e);
        if (isSuccess) {
            navigate('/loginPage');
        }
    }
    return(
        <div className="loginPage bg-[#eef3f9] py-8 sm:py-0 flex flex-col gap-8 sm:gap-0 sm:flex-row justify-center items-center w-[100%] min-h-screen sm:h-[100vh]">
            <div className="title w-[100%] sm:w-[60%] h-[100%] flex flex-col justify-center items-center">
                <h1 className="text-[65px] sm:text-[85px] font-bold text-[#3073c1]">WELCOME</h1>
                <p className="sm:w-[53%] text-right text-[16px] sm:text-[18px] text-[#3073c1] mr-[5px]">
                   : به اطلاع دانشجویان محترم میرساند <br />
                    لطفا اطلاعات خواسته شده را به درستی وارد کنید<br />
                    رمز عبور حداقل باید 8 کاراکتر و حداکثر 12 کاراکتر باشد
                </p>
            </div>
            <div className="login bg-[#eef3f9] sm:bg-[#3073c1] w-[100%] sm:w-[40%] h-[100%] flex justify-center items-center flex-col">
                <div dir="rtl" className="form flex flex-col mb-4 justify-center items-start gap-[10px]">
                    <label htmlFor="username" className="text-[#3073c1] sm:text-[snow] mr-[10px]">نام و نام خانوادگی</label>
                    <input type="text" className="w-[90%] h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none" id="username" value={UserID} onChange={handleUserID}/>

                    <label htmlFor="studentNumber" className="text-[#3073c1] sm:text-[snow] mr-[10px]">شماره دانشجویی</label>
                    <input type="text" className="w-[90%] h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none" id="studentNumber" value={studentNumber} onChange={handleStudentNumber}/>

                    <label htmlFor="email" className="text-[#3073c1] sm:text-[snow] mr-[10px]">ایمیل</label>
                    <input type="email" className="w-[90%] h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none" id="email" value={Email} onChange={handleEmail}/>

                    <label htmlFor="password" className="text-[#3073c1] sm:text-[snow] mr-[10px]">رمز عبور</label>
                    <div className="relative w-[90%]">
                        <input id="password" className="w-full h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none" type={showPassword ? "text" : "password" }value={password} onChange={handlePass}/>
                        <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute top-[3px] left-2 text-[#3073c1]">
                            {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                            ) : (
                            <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>

                    <label htmlFor="confirmPassword" className="text-[#3073c1] sm:text-[snow] mr-[10px]">تکرار رمز عبور</label>
                    <div className="relative w-[90%]">
                        <input id="confirmPassword" className="w-full h-[30px] pr-[10px] border border-[#3073c1] text-[#3073c1] sm:text-[#111] sm:border-none" type={showConfirmPassword ? "text" : "password" } value={ConfirmPassword} onChange={handleConfirmPassword}/>
                        <button type="button" onClick={() => setShowConfirmPassword(prev => !prev)} className="absolute top-[3px] left-2 text-[#3073c1]">
                            {showConfirmPassword ? (
                            <i className="fas fa-eye-slash"></i>
                            ) : (
                            <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>


                    <div className="formBtn w-[90%] flex justify-between sm:justify-start items-center sm:gap-[5px]">
                        <div className="btnLogin py-[6px] px-[23px] border border-[#3073c1] text-[#3073c1] bg-[snow]">
                            <a href="/loginPage" className="" onClick={handleSignUP}>ثبتنام</a>   
                        </div>
                        <div className="btnSignUp py-[6px] px-[19px] sm:px-[23px] sm:border-b border border-[#3073c1] text-[#3073c1] bg-[snow]">
                            <a href="/loginPage" onClick={handleClick} className="border-b border-[#3073c1]">ورود به حساب </a>
                        </div>

                    </div>
                </div>
                {text ?(
                            <p className="text-[#3073c1] sm:text-[snow] border-b border-[#3073c1] sm:border-[snow] ml-[30px]">{text}</p>
                        ):(
                            <p className="hidden">{text}</p>
                        )
                    }
                <a href="#" className="text-[#3073c1] sm:text-[snow] ml-[37px] mt-[20px] text-start border-b border-[#3073c1] sm:border-[snow]">نمیتوانید ثبتنام کنید؟</a>
            </div>
        </div>
    );
};
export default SignUp;