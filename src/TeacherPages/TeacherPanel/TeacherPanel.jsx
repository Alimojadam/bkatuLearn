import { useUser } from "../../Pages/coursesContext";
import student from "../../Pages/img/userIMG.png";



const TeacherPanel=()=>{

  const { user } = useUser();
  const teacher = user;


    return(
        <div className="w-full flex flex-col justify-center gap-5 items-center">
            <h1 className="text-4xl font-extrabold text-[#2c5282] mb-4">پنل مدرس</h1>

            {/* کارت اطلاعات مدرس */}
            <div className="w-[95%] sm:w-5xl bg-[snow] p-6 rounded-3xl shadow-lg border border-[#2c5282] flex flex-col sm:flex-row gap-6 items-start justify-center">
                <img
                    src={student || "/default-profile.png"}
                    alt="teacher"
                    className="w-36 h-36 rounded-full object-cover border-4 border-[#2c5282]"
                />

                <div className="flex flex-col gap-2 flex-1">
                    <h2 className="text-2xl font-semibold text-[#2c5282]">{teacher.name}</h2>
                    <p className="text-gray-700 mt-1">رشته : <span className="font-medium">{teacher.study}</span></p>
                    <p className="text-gray-700">دانشگاه : <span className="font-medium">{teacher.university}</span></p>
                    <p className="text-gray-700">ایمیل : <span className="font-medium">{teacher.email}</span></p>
                    {teacher.aboutTeacher && (
                    <p className="text-gray-600 text-justify mt-3 bg-[#f7fafc] p-3 rounded-lg shadow-inner">
                        درباره مدرس : {teacher.aboutTeacher}
                    </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeacherPanel;