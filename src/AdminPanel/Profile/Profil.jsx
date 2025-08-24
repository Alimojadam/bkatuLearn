import { useState } from "react";
import ChangePass from "./ChangePass/ChangePass";
import EditProfile from "./EditProfile/EditProfil";




const Profil=()=>{

    const [activeItem,setActiveItem]=useState(1);


    return(
        <div className="w-full min-h-screen flex flex-col justify-start items-center gap-5">
            <div className="flex flex-row-reverse justify-center items-center w-[80%] h-[50px] border border-[#1E3A8A] rounded-md mt-20">
                <div onClick={()=>setActiveItem(1)} className={`text-[17px] h-full w-[50%] flex justify-center items-center cursor-pointer transition-all duration-300 ${activeItem===1 ?"text-[snow] bg-[#1E3A8A]":"text-[#1E3A8A] bg-transparent"}`}>
                    <p className="text-center">ویرایش پروفایل</p>
                </div>
                <div className="border-r border-[#1E3A8A] h-full"></div>
                <div onClick={()=>setActiveItem(2)} className={`text-[17px] h-full w-[50%] flex justify-center items-center cursor-pointer transition-all duration-300 ${activeItem===2 ?"text-[snow] bg-[#1E3A8A]":"text-[#1E3A8A] bg-transparent"}`}>
                <p className="text-center" >تغییر رمز عبور</p>
                </div>
            </div>
            <div className="w-[80%] flex justify-center items-center mt-5">
                {activeItem===1 && <EditProfile/>}
                {activeItem===2 && <ChangePass/>}

            </div>



        </div>
    )
}
 export default Profil;