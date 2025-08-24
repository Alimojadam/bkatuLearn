import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserInformation } from "../../Information/User";
import Admin from "../../Pages/img/userIMG.jpg";



const UserPage=()=>{

    const { id } = useParams();

    const[user,setUser] = useState(UserInformation.find(u => u.id === parseInt(id)))

    return(
        <div className="w-full min-h-screen bg-[#eef3f9] flex justify-center items-center py-5 sm:py-0">
            <div className="relative w-[90%] sm:w-[40%] h-[500px] mt-20 border border-[#1E3A8A] rounded-md shadow-xl">
                <div className="absolute -top-[85px] w-full flex flex-col justify-center items-center py-5 gap-3">
                    <div className="w-[140px] h-[140px]">
                        <img src={user.profileImg || Admin} alt="" className="w-full h-full rounded-[50%]" />
                    </div>
                    <p className="text-[18px]">{user.name}</p>
                </div>
                <div dir="rtl" className="flex flex-col items-start justify-center gap-3 px-3 mt-35 text-[17px]">
                    <p>شماره دانشجویی : {user.studentNumber}</p>
                    <p>ایمیل : {user.email}</p>
                    <p>رشته تحصیلی : {user.study}</p>
                    <p>دانشگاه محل تحصیل : {user.university}</p>
                    <p>درباره کاربر : {user.aboutMe}</p>
                </div>
            </div>

        </div>
    )
}
export default UserPage;