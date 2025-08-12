import logo from '../img/logo_header.png';
import userImg from '../img/userIMG.jpg';
import '../coursesPage/CoursesPage.css';
import { useState } from 'react';
import { useSearch, useUser } from '../../Pages/coursesContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavbarCourses = () => {
  const {user} = useUser();
  const { searchTerm, setSearchTerm } = useSearch();
  const links = [
    { id: 'CoursesPage', label: 'دوره ها' },
    { id: 'Teachers', label: 'مدرسین' },
    { id: '', label: 'صفحه اصلی' },
    { id: 'AboutUs', label: 'در باره ما' },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="z-50 fixed top-[0] navbar shadow-md m-[0px] p-[0px] w-[100%] h-[75px] bg-[snow] flex gap-5 sm:gap-0 flex-row-reverse items-center justify-between px-[15px]">
      
      <button
        onClick={toggleMenu}
        className="sm:hidden text-[#3073c1] text-[24px] mr-2 cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* لینک‌ها */}
      <ul className={`
          flex flex-row-reverse gap-[35px] items-center justify-center
          sm:flex-row-reverse
          ${isMenuOpen ? 'flex flex-col absolute top-[75px] right-0 bg-[snow] w-full shadow-md p-4 sm:static sm:flex-row sm:shadow-none sm:p-0' : 'hidden sm:flex'}
        `}>
        {links.map(({ id, label }) => {
          const isActive = location.pathname === `/${id}`;
          return (
            <li key={id}>
              <a
                href={`/${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${id}`);
                  setIsMenuOpen(false);
                }}
                className={`text-[17px] sm:text-[19px] font-[1] ${
                  isActive ? 'text-[#3073c1]' : 'text-[#222]'
                } hover:text-blue-600 cursor-pointer`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      <ul className="searchBar bg-[#ccc] w-[450px] rounded-[30px] px-[8px] flex flex-row-reverse justify-end items-center">
        <input
          type="text"
          placeholder="دنبال چی میگردی؟"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </ul>

      <ul className="flex gap-[35px] items-center justify-center">
        <li className='hidden sm:block'>
          <div className="h-10 header-logo">
            <div className="logo sm:min-w-[62px] sm:min-h-[39px]">
              <img src={logo} alt="" />
            </div>
          </div>
        </li>
        <li>
          {user && user.type!="Admin" ? (
            <Link
            to="/UserAccount"
            className="rounded-[18px] h-[36px] w-[120px] bg-[#3073c1] flex flex-row-reverse items-center justify-between pr-[10px]"
            >
            <p className="text-[snow] text-[17px]">داشبورد</p>
            <div className="w-[42px] h-[42px] rounded-[50%] bg-[snow] bg-cover bg-no-repeat">
              <img
                src={userImg}
                alt=""
                className="w-full h-full object-cover rounded-[50%]"
              />
            </div>
          </Link>
          ) : (
            <Link
            to="/loginPage"
            className="rounded-[18px] h-[36px] w-[120px] bg-[#3073c1] flex flex-row-reverse items-center justify-center gap-2"
            >
              <i class="far fa-user text-[snow]"></i>
              <p className="text-[snow] text-[17px]">ورود/ثبتنام</p>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
export default NavbarCourses;
