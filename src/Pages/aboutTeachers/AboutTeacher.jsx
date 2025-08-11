import { Link, useNavigate, useParams } from "react-router-dom";
import { teachers } from "../teachers/TeacherInfo";
import userIMG from "../img/userIMG.jpg";

const AboutTeacher = () => {
    const { id } = useParams();
    const teacher = teachers.find(c => c.id === parseInt(id));
    var num=0;

    if (!teacher) {
        return <p>معلم مورد نظر پیدا نشد</p>;  // نمایش پیام در صورت عدم یافتن معلم
    }

    return (
        <div className="w-full bg-[#eef3f9] pt-20 pb-5 sm:pt-0 sm:pb-0  sm:h-[100vh] flex flex-col sm:flex-row">


            {/* AboutTeacher ********************************************************/}

            <div className="min-h-screen relative flex justify-center sm:h-[100vh] items-end w-full sm::w-[60%] bg-[#eef3f9]">
                <div className="flex flex-col justify-start items-center relative shadow-2xl bg-transparent sm:mb-[20px] border border-[#3073c1] border-2 rounded-[10px] w-[90%] sm:w-[65%] sm:h-[500px]">
                    <div className="absolute flex justify-center items-center flex-col gap-3 left-1/2 transform -translate-x-1/2 top-[-11vh]">
                        <div className="shadow-xl w-[120px] h-[120px] rounded-[50%] border border-1 border-[#3073c1]">
                            <img className="rounded-[50%] w-full h-full object-cover" src={userIMG}  alt={teacher.name}/>
                        </div>
                        <p className="text-[#3073c1] text-[20px]">{teacher.name}</p>
                    </div>
                    <div className="w-[90%] mt-[130px] flex flex-col gap-2 justify-start items-end">
                        <p className="text-[#3073c1] text-[17px] sm:text-[18px]">تحصیلات : {teacher.study}</p>
                        <p className="text-[#3073c1] text-[17px] sm:text-[18px]">تعداد دوره‌های فعال : {teacher.NomberOFactiveCourses}</p>
                        <p className="text-[#3073c1] text-[17px] sm:text-[18px]">دانشگاه محل تحصیل : {teacher.university}</p>
                        <p dir="rtl" className="text-[#3073c1] text-[17px] sm:text-[18px] text-justify">
                            درباره مدرس : <span className="leading-[5px]">{teacher.aboutTeacher}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* SyllabusTeacher ************************************************/}

            <div className="flex justify-center items-start w-full sm:w-[40%] bg-[#eef3f9] sm:bg-[#3073c1] p-4">
                <div className="w-full sm:w-[90%] flex flex-col justify-start items-end mt-[30px] gap-10">
                    <h2 className="text-[22px] mr-[3vh] sm:mr-0 sm:text-[25px] text-[#3073c1] sm:text-[snow] border-b pb-1">دوره های {teacher.name}</h2>
                    <div className="w-full flex justify-center items-center">
                        {teacher.courses && teacher.courses.length > 0 ? (
                            <ul className="flex flex-col gap-5 w-[90%]" >
                                {teacher.courses.map(course => (
                                    num++,
                                    <li dir="rtl" key={course.id} className="w-full bg-[snow] flex justify-start items-center mr-[5px] rounded-[5px] pr-[10px] py-[8px] border border-[#3073c1] sm:border-none text-[#3073c1] text-[18px] cursor-pointer">
                                        <Link to={`/CoursPage/${course.id}`} className="w-full h-full flex justify-start items-center"> {num} - {course.title} </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-[20px] text-[snow]">!دوره‌ای برای نمایش وجود ندارد</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutTeacher;
