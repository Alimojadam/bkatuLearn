import khatam from '../../img/khatam.png'
import menu from '../../img/menu icon.png'
import NavBar from './NavBar'
import SetStudentImg from './SetStudentImg'
import { useNavigate } from 'react-router-dom';
import React from 'react';


const Header=()=>{
    const navigate = useNavigate();
      
    const handleClick = (e) => {
        e.preventDefault(); // جلوگیری از رفرش شدن صفحه
        navigate('/loginPage'); // رفتن به صفحه لاگین
    };

    return(
        <nav className="flex w-full nav-header relative">
            <div className="headerBody w-[100%] sm:w-[62%] relative">
                <NavBar/>
                <div className="body h-[600px] items-center relative">
                    <div className="grid items-center justify-center absolute mt-40 sm:mt-50 ">
                        <h1 className="text-center text-black text-[22px] px-[5px] sm:px-[0px] sm:text-[27px] mb-[15px] sm:pr-[75px]">!به سیستم آموزشی جامع دانشگاه خاتم خوش آمدید</h1>
                        <p dir='rtl' className="text-justify sm:text-start text-[16px] px-[5px] sm:px-[0px] sm:text-[19px] sm:px-[100px] sm:pr-[160px] text-gray-900 mr-[15px]">در سیستم نرم افزاری طراحی شده ما شما میتوانید با مشاهده نمونه تدریس اساتید مختلف و آشنایی با روش تدریس هریک مطابق سلیقه خود دوره آن ها را تهیه کنید و سپس میتوانید با مدرس هر دوره ارتباط داشته باشید و سوالات خود را بپرسید</p>
                        <div className="btn btn-login">
                        <a href="/loginPage"  onClick={handleClick} className="text-center sm:text-end">ثبتنام یا ورود</a>
                        </div>
                    </div>
                </div>
            
            </div>

            <section>
                <section className="header-icon flex gap-10 relative">
                    {/* <a href="#"><i class="fa-solid fa-user icon"></i></a> */}
                    <a href="#" className="">
                    {/* <img src={user} alt="" /> */}
                    <i class="fa-solid fa-user icon user"></i>
                    </a>
                    <a href="#" className="icon menu">
                    <img src={menu} alt="" />
                    </a>
                </section>
            </section>
            <div className="khatam-img z-10 absolute flex justify-center items-center hidden sm:block">
                <img src={khatam} alt="" />
            </div>
            <SetStudentImg/>
            <div className="svg absolute top-[75%] left-[-15px] flex">
                <svg width="1500" height="600" xmlns="http://www.w3.org/2000/svg">
                {/* <!-- مسیر منحنی اول تا آخرین منحنی که کامل زیر آن رنگ شود --> */}
                <path d="M0,100 
                        Q80,50 110,100 
                        T210,120 
                        T310,120 
                        T410,120 
                        T550,120 
                        T610,120 
                        T710,120
                        T810,120 
                        T910,120 
                        T1010,120
                        T1110,120 
                        T1210,120
                        T1310,120 
                        T1410,120 
                        L710,600 
                        L10,600 
                        Z" 
                        fill="#3073c1" />
                {/* <!-- خط منحنی‌ها (اختیاری) --> */}
                <path d="M120,100 
                        Q60,50 110,100 
                        T210,120 
                        T310,120 
                        T410,120 
                        T510,110 
                        T610,120 
                        T710,120
                        T810,120 
                        T910,120 
                        T1010,120
                        T1110,120 
                        T1210,120
                        T1310,120 
                        T1410,120" 
                        fill="transparent"/>
                </svg>
            </div>
      </nav>
    )
}
export default Header;