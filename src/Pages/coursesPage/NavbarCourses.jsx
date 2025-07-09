import logo from '../img/logo_header.png';
import user from '../img/userIMG.jpg';
import '../coursesPage/CoursesPage.css';
import { useState } from 'react';
import { useSearch } from '../../Pages/coursesContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';





const NavbarCourses=()=>{

    const { searchTerm, setSearchTerm } = useSearch();
        
    
    
    const links = [
        { id: 'CoursesPage', label: 'دوره ها' },
        { id: 'Teachers', label: 'مدرسین' },
        { id: '', label: 'صفحه اصلی' },
        { id: 'AboutUs', label: 'در باره ما' },
    ];
    const [activeLink, setActiveLink] = useState(links[0].id);

    const navigate= useNavigate();
    const location = useLocation();

    

    return(
        <div className="z-10 fixed top-[0] navbar shadow-md m-[0px] p-[0px] w-[100%] h-[75px] bg-[snow] flex flex-row-reverse items-center justify-between px-[15px]">
                <ul className="flex flex-row-reverse gap-[35px] items-center justify-center">
                    {links.map(({ id, label }) => {
                    const isActive = location.pathname === `/${id}`;
                    return (
                        <li key={id}>
                            <a
                                href={`/${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${id}`);
                                }}
                                className={`text-[18px] font-[1] ${
                                    isActive ? 'text-[#3073c1]' : 'text-[#222]'
                                } hover:text-blue-600`}
                            >
                                {label}
                            </a>
                        </li>
                    );
                })}
                </ul>
                <ul className='searchBar bg-[#ccc] w-[470px] rounded-[30px] px-[8px] flex flex-row-reverse justify-end items-center'>
                    <input type="text" name="" id="" placeholder='دنبال چی میگردی؟'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i class="fas fa-search"></i>
                </ul>
                <ul className="flex gap-[35px] items-center justify-center">
                    <li>
                        <div className="h-10 header-logo">
                            <div className="logo">
                                <img src={logo} alt="" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to="/UserAccount" className="rounded-[18px] h-[36px] w-[120px] bg-[#3073c1] flex flex-row-reverse items-center justify-between pr-[10px]">
                            <p className='text-[snow] text-[17px]'>داشبورد</p>
                            <div className="w-[42px] h-[42px] rounded-[50%] bg-[snow] bg-cover bg-no-repeat">
                                <img src={user} alt="" className='w-full h-full object-cover rounded-[50%] ' />
                            </div>
                        </Link>
                    </li>
                </ul>
        </div>
    )
}
export default NavbarCourses;