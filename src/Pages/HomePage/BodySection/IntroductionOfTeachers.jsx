import { useContext } from 'react';
import student from '../../img/png.png'
import { textContext } from './context';

const IntroductionOfTeachers=()=>{
    const teachers=[
        {name : "حسین شریف" , study : "دکترای مخابرات" , NomberOFactiveCourses : " 13" , activeCourses : "دوره فعال" , image : student},
        {name : "اکبر کاظمی" , study : "لیسانس کامپیوتر" , NomberOFactiveCourses : " 2" ,  activeCourses : "دوره فعال" , image : student},
        {name : "علی حسینی" , study : "ارشد برق" , NomberOFactiveCourses : " 5" ,  activeCourses : "دوره فعال" , image : student},
        {name : "یوسف قنبری" , study : "لیسانس معماری" , NomberOFactiveCourses : " 13" ,  activeCourses : "دوره فعال" , image : student},
        {name : "فیروز اکرمی" , study : "لیسانس کامپیوتر" , NomberOFactiveCourses : " 8" ,  activeCourses : "دوره فعال" , image : student},
        {name : "محمد کریمی" , study : "لیسانس جانور شناسی" , NomberOFactiveCourses : " 7" ,  activeCourses : "دوره فعال" , image : student}
    ];

    const {bgColor,setBgColor}=useContext(textContext);
    return(
        <div className="relative flex flex-col lg:flex-row items-start justify-start gap-8 p-10">
            <div className=" mt-[50px] z-10 ml-[50px]">
                {/* <img src={teacher_img} alt="" /> */}
                {/* <div className="teachers-box relative">
                    
                </div> */}
                <ul className=" relative grid gap-5 grid-cols-3">
                    {teachers.map((teacher,index)=>(

                        <li key={index} className="relative teachers-box">
                            <svg viewBox="0 0 300 200" className="absolute top-[-18px] svg">
                            <path d="M0,100 C100,250 100,-20 300,50 L300,0 L0,0 Z100 path" stroke-linecap="round" fill={bgColor} />
                            </svg>
                            <div className="teacher-img flex item-center justify-center mt-[1px]">
                            <img src={teacher.image} alt=""/>
                            </div>
                            <svg viewBox="0 0 290 200" className="absolute top-[84px] svg-img" fill="transparent">
                            <path d="M0,100 C100,250 100,-20 300,50 L300,0 ,0 Z100 " fill="transparent"   />
                            <path d="M0,100 C100,250 100,-20 300,50 L00,6000 ,0 Z100 " fill="#3073c1" stroke="white" stroke-width="5"/>
                            </svg>
                            <div className="teacher-body flex flex-col justify-start items-end mr-[5px] mb-[5px] gap-[5px] px-[2px]">
                                <h4 className="text-[#edd400] text-end text-[19px] mt-[5px] z-19">{teacher.name}</h4>
                                <p className="text-end text-[15px] text-gray-200">{teacher.study}</p>
                                <pre className="text-end text-[15px] text-gray-200 flex">{teacher.activeCourses}<pre>{teacher.NomberOFactiveCourses}</pre></pre>
                            </div>
                        </li>
                        
                    ))}
                </ul>
            </div> 
                {/* Info Section */}
            <div className="max-w-xl text-center lg:text-right mt-[180px] z-10">
                <h2 className=" text-[27px]">!بهترین اساتید دانشگاه رو برات اینجا جمع کردیم</h2>
                <p className="text-gray-900 mt-4 text-[18px]">در سیستم نرم‌افزاری طراحی‌شده‌ی ما، شما می‌توانید با مشاهده نمونه تدریس اساتید مختلف، آشنا شوید و روش تدریس هر یک را مقایسه کنید</p>
                <button className="mt-6 px-6 py-2 btn btn-blue shadow-md transition">مشاهده بیشتر</button>
            </div>
        </div>
    )
}
export default IntroductionOfTeachers;