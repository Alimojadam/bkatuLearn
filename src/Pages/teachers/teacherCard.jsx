
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { textContext } from '../HomePage/BodySection/context';
// import { teachers } from './TeacherInfo';



const TeacherCard=({teachers})=>{



    const {bgColor}=useContext(textContext); 

    const aboutTeacher = useNavigate();
      
    const aboutTeacherHandleClick = (e) => {
        e.preventDefault();
        aboutTeacher('/AboutTeacher');
    };

    return(
        <>
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
                    <div className="teacher-body flex flex-col justify-end items-start mr-[5px] mb-[5px] gap-[5px] px-[2px]">
                        <h4 className="text-[#edd400] text-start text-[19px] mt-[5px] z-19">{teacher.name}</h4>
                        <p className="text-start text-[15px] text-gray-200">{teacher.study}</p>
                        <pre className="text-start text-[15px] text-gray-200 flex">{teacher.activeCourses}<pre>{teacher.NomberOFactiveCourses}</pre></pre>
                    </div>
                        <a href={`/AboutTeacher`} onClick={aboutTeacherHandleClick} className="absolute bottom-[7px] left-[10px] text-end text-[17px] text-[snow] border-b border-[snow] pb-[2px]">مشاهده</a>
                </li>

            ))}
        </>
    )
}

export default TeacherCard;