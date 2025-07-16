import { useUser } from '../coursesContext';
import userIMG from '../img/userIMG.jpg';






const Profil=()=>{


    const {user}=useUser();
    return(
        <div className="flex flex-col justify-start items-end gap-20 mt-[10px] w-[60%] h-[80vh] bg-transparent border border-2 border-[#3073c1] rounded-[10px] shadow-xl">
            <div className="flex flex-col gap-3 w-[150px] h-[150px] rounded-[50%] mt-[-15%] mr-[33%]">
                <img src={userIMG} alt="" className="w-[150px] h-[150px] rounded-[50%]" />
                <p className="text-center text-[#3073c1] text-[20px]">{user.name}</p>
            </div>
            <div className="mr-[20px]">
                <div className="flex flex-col justify-start items-end gap-2">
                    <p className="text-end text-[#3073c1] text-[19px]">شماره دانشجویی : {user.studentNumber}</p>
                    <p dir="rtl" className="text-end text-[#3073c1] text-[19px]">ایمیل : {user.email}</p>
                    <p className="text-end text-[#3073c1] text-[19px]">رشته تحصیلی : {user.study}</p>
                    <p className="text-end text-[#3073c1] text-[19px]">دانشگاه محل تحصیل : {user.university}</p>
                    <p className="text-end text-[#3073c1] text-[19px]">درباره من : {user.aboutMe}</p>
                </div>
            </div>
        </div>
    )
}
export default Profil;