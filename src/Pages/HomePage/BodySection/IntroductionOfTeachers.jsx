import { useContext } from 'react';
import TeacherCard from '../../teachers/teacherCard';
import { textContext } from './context';
import { teachers } from '../../teachers/TeacherInfo';
import { Link, useNavigate } from 'react-router-dom';

const IntroductionOfTeachers=()=>{

    const {bgColor}=useContext(textContext);

    const aboutTeacher = useNavigate();
      
    const aboutTeacherHandleClick = (e) => {
        e.preventDefault();
        aboutTeacher('/AboutTeacher');
    };


    return(
        <div className="relative flex flex-col lg:flex-row items-center justify-center sm:items-start sm:justify-start gap-8 p-10">
            <div className=" mt-[30px] sm:mt-[50px] sm:ml-[50px] z-10">
                {/* <img src={teacher_img} alt="" /> */}
                {/* <div className="teachers-box relative">
                    
                </div> */}
                <ul dir='rtl' className=" relative grid justify-center items-center gap-15 sm:gap-5 grid-cols-2 sm:grid-cols-3">
                    
                    {teachers.slice(0,6).map((teacher,index)=>(

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
                            <div className="teacher-body flex flex-col justify-start items-start mr-[5px] mb-[5px] gap-[5px] px-[2px]">
                                <h4 className="text-[#edd400] text-end text-[19px] mt-[5px] z-19">{teacher.name}</h4>
                                <p className="text-end text-[15px] text-gray-200 text-justify leading-tight">{teacher.study}</p>
                                <pre className="text-end text-[15px] text-gray-200 flex">{teacher.NomberOFactiveCourses} {teacher.activeCourses}</pre>
                                <Link to={`/AboutTeacher/${teacher.id}`} className=" mr-[55%] text-start text-[17px] text-[snow] border-b border-[snow] pb-[2px]">مشاهده</Link>
                            </div>
                        </li>

                    ))}
                </ul>
            </div> 
                {/* Info Section */}
            <div className=" max-w-xl text-center lg:text-right sm:mt-[180px] ">
                <h2 className="hidden sm:block  text-[27px]">!بهترین اساتید دانشگاه رو برات اینجا جمع کردیم</h2>
                <p className="hidden sm:block text-gray-900 mt-4 text-[18px]">در سیستم نرم‌افزاری طراحی‌شده‌ی ما، شما می‌توانید با مشاهده نمونه تدریس اساتید مختلف، آشنا شوید و روش تدریس هر یک را مقایسه کنید</p>
                <button className="mt-6 px-6 py-2 btn btn-blue shadow-md transition">مشاهده بیشتر</button>
            </div>
        </div>
    )
}
export default IntroductionOfTeachers;