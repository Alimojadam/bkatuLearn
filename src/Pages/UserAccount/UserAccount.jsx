import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import MyCourses from "./MyCourses";
import Profil from "./Profil";






const UserAccount=()=>{

    const navbarList =[
        {id:1 , title: "پروفایل", icon:"fa-solid fa-user mr-1"},
        {id:2 , title: "دوره های من", icon:"fas fa-folder-open"},
        {id:3 , title: "ویرایش حساب", icon:"fas fa-user-edit"},
        {id:4 , title: "تغییر رمز عبور", icon:"fas fa-key"},
        {id:5 , title: "درخواست تدریس", icon:"fas fa-chalkboard-teacher"},
        {id:6 , title: "خروج از حساب کاربری", icon:"fas fa-sign-out-alt"},
    ]

    const [isActive ,setIsActive]=useState(1);
    const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");

    useEffect(() => {
        setFadeClass("opacity-0 translate-y-4");
        const timeout = setTimeout(() => {
        setFadeClass("opacity-100 translate-y-0");
        }, 150);

        return () => clearTimeout(timeout);
    }, [isActive]);


    const handlIsActive=(id)=>{
        setIsActive(id)
    };
    return(
        <div className="relative flex justify-between items-center flex-row-reverse w-full min-h-screen bg-[#eef3f9] px-[20px]">
            <div className="relative h-full">
                <div className="fixed top-10 right-0 z-50 navList mr-[20px] flex justify-start items-start bg-[#3073c1] w-[35%] h-[90vh] rounded-[10px]">
                    <ul className="w-[97%] flex flex-col gap-3 mt-[20px] ">
                        {navbarList.map((List)=>(
                            <li key={List.id} onClick={()=>handlIsActive(List.id)} className={`${isActive===List.id ? `bg-[#eef3f9] text-[#3073c1]`: `bg-[#3073c1] text-[#eef3f9]` } w-full flex justify-end items-center gap-6 cursor-pointer rounded-r-[10px] px-[10px] py-[3px]  transition-all duration-400 ease-in-out`}>
                                <p className="text-[19px]">{List.title}</p>
                                <i className={`${List.icon} text-[20px]`}></i>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
            <div className={`aboutUser w-[64%] h-full mt-[40px] ml-[20px] flex justify-center items-center bg-[#eef3f9] transition-all duration-500 ease-out opacity-0 ${fadeClass}`}>
                
                
                {/* Profile******************** */}
                {isActive===1 && <Profil/>}
                
                {/* UserCourses**************** */}
                {isActive===2 && <MyCourses/>}
                
                {/* EditProfile**************** */}
                {isActive===3 && <EditProfile/>}

                {/* ChangePassword************* */}
                {isActive===4 && <ChangePassword/>}
                    
            </div>
        </div>
    )
}

export default UserAccount;