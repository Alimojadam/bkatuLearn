import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../coursesContext";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import MyCourses from "./MyCourses";
import Profil from "./Profil";
import RequestForTeaching from "./RequestForTeaching";

const UserAccount = () => {
  const { user, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const [isActive, setIsActive] = useState(1);
  const [fadeClass, setFadeClass] = useState("opacity-0 translate-y-4");
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    setFadeClass("opacity-0 translate-y-4");
    const timeout = setTimeout(() => {
      setFadeClass("opacity-100 translate-y-0");
    }, 150);

    return () => clearTimeout(timeout);
  }, [isActive]);

  if (!user || logout) {
    return <Navigate to="/LoginPage" replace />;
  }

  const userType = user.type;

  const navbarList = [
    { id: 1, title: "پروفایل", icon: "fa-solid fa-user mr-1" },
    { id: 2, title: "دوره های من", icon: "fas fa-folder-open" },
    { id: 3, title: "ویرایش حساب", icon: "fas fa-user-edit" },
    { id: 4, title: "تغییر رمز عبور", icon: "fas fa-key" },
    ...(userType === "User"
      ? [{ id: 5, title: "درخواست تدریس", icon: "fas fa-chalkboard-teacher" }]
      : [{ id: 6, title: "ورود به پنل تدریس", icon: "fas fa-door-open" }]),
    { id: 7, title: "خروج از حساب کاربری", icon: "fas fa-sign-out-alt" },
  ];

  const handleIsActive = (id) => {
    if (id === 7) {
      localStorage.removeItem("user");
      setUser(null);
      setLogout(true);
    } else {
      setIsActive(id);
    }
    toggleMenu();
  };

  
        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

  return (
    <div className="relative flex justify-between items-start flex-row-reverse w-full min-h-screen bg-[#eef3f9] px-[20px]">
      <div className="relative h-full">
        <div className={`fixed top-0 sm:top-10 right-0 z-50 navList  sm:mr-[20px] flex justify-start items-start bg-[#3073c1] min-h-screen sm:h-[90vh] rounded-l-[10px] sm:rounded-[10px]
            ${isMenuOpen ? "w-[80%]" : "w-0"} sm:w-[35%] transition-all duration-300 ease-in-out`}>
          <div className="sm:absolute sm:hidden button-9 sm:top-3 sm:left-2 flex items-start justify-start ">
            {isMenuOpen ? (
                <i
                className="fa-solid fa-xmark absolute top-3 left-3 sm:top-0 sm:left-0 sm:relative text-[24px] text-[snow] cursor-pointer"
                onClick={toggleMenu}
                ></i>
            ):(
              <i
                className="fa-solid fa-bars absolute right-3 top-3 text-[22px] text-[#3073c1] sm:text-[snow] cursor-pointer"
                onClick={toggleMenu}
              ></i>
            )}
          </div>
          <ul className={`w-[97%] flex flex-col gap-3 pt-5 sm:pt-0 min-h-screen mt-[20px] ${isMenuOpen ? "flex" : "hidden"} sm:flex`}>
            {navbarList.map((List) => (
              <li
                key={List.id}
                onClick={() => handleIsActive(List.id)}
                className={`${
                  isActive === List.id
                    ? `bg-[#eef3f9] text-[#3073c1]`
                    : `bg-[#3073c1] text-[#eef3f9]`
                } w-full flex justify-end items-center gap-6 cursor-pointer rounded-r-[10px] px-[10px] py-[3px] transition-all duration-400 ease-in-out`}
              >
                <p className="text-[19px]">{List.title}</p>
                <i className={`${List.icon} text-[20px]`}></i>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`aboutUser w-full sm:w-[64%] h-full my-[10vh] sm:ml-[20px] flex justify-center items-center bg-[#eef3f9] transition-all duration-500 ease-out opacity-0 ${fadeClass}`}
      >
        {isActive === 1 && <Profil />}
        {isActive === 2 && <MyCourses />}
        {isActive === 3 && <EditProfile />}
        {isActive === 4 && <ChangePassword />}
        {userType === "User" && isActive === 5 && <RequestForTeaching />}
        {userType === "Teacher" && isActive === 6 && (
          <Navigate to="/TeacherHomePage" replace />
        )}
      </div>
    </div>
  );
};

export default UserAccount;
