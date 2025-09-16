import { useUser } from '../coursesContext';
import userIMG from '../img/userIMG.png';

const Profil = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-[#3073c1] text-xl">در حال بارگذاری...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-[#3073c1] text-xl">شما وارد نشده‌اید</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-start items-end gap-20 mt-[7vh] w-[90%] sm:w-[60%] sm:h-[85vh] bg-transparent border-2 border-[#3073c1] rounded-[10px] shadow-xl">
      <div className="absolute flex flex-col gap-3 w-[150px] h-[150px] rounded-[50%] left-1/2 -translate-x-1/2 top-[-11vh]">
        <img
          src={user.profileImg}
          alt="Profile"
          className="w-[150px] h-[150px] rounded-[50%]"
        />
        <p className="text-center text-[#3073c1] text-[20px]">{user.name}</p>
      </div>
      <div className="mr-[20px] mt-[160px] pb-5">
        <div className="flex flex-col justify-start items-end gap-2">
          <p dir="rtl" className="text-end text-[#3073c1] text-[19px]">
            شماره دانشجویی : {user.studentNumber}
          </p>
          <p dir="rtl" className="text-end text-[#3073c1] text-[19px]">
            ایمیل : {user.email}
          </p>
          <p dir="rtl" className="text-end text-[#3073c1] text-[19px]">
            رشته تحصیلی : {user.study}
          </p>
          <p dir="rtl" className="text-end text-[#3073c1] text-[19px]">
            دانشگاه محل تحصیل : {user.university}
          </p>
          <p dir="rtl" className="text-end text-[#3073c1] text-[19px] whitespace-normal break-words">
            درباره من : {user.aboutMe}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profil;
