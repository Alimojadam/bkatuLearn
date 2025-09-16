import { useState } from "react";
import { UserInformation } from "../../Information/User";
import Admin from "../../Pages/img/userIMG.png";
import { Link } from "react-router-dom";
import { useSearch } from "../../Pages/coursesContext";
import logo from '../../Pages/img/logo_header.png';




const UsersManagement = () => {
  const [users, setUsers] = useState(UserInformation);
  const [blockUserId, setBlockUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();

    // Search by name and studentNumber
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(user.studentNumber).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  

    // blockUser
  const handleBlock = () => {
    setUsers(users.filter(user => user.id !== blockUserId));
    setBlockUserId(null);
  };

  return (
    <div className="w-full relative min-h-screen sm:flex sm:justify-center sm:items-center py-5">
        <div className="fixed flex justify-center items-center top-0 w-full sm:w-[75%] h-[70px] bg-[snow] shadow-lg z-10">
                <ul className="w-[80%] sm:w-full flex flex-row-reverse justify-end sm:justify-center items-center sm:gap-10 sm:ml-2">
                    <li className="searchBar bg-[#ccc] sm:w-[450px] rounded-[30px] px-[8px] flex flex-row-reverse justify-end items-center">
                        <input
                            type="text"
                            placeholder="جستجوی کاربر"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="fas fa-search"></i>
                    </li>
                    <li className='hidden sm:block'>
                        <div className="h-10 header-logo">
                            <div className="logo sm:min-w-[62px] sm:min-h-[39px]">
                                <img src={logo} alt="" />
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
      <ul dir="rtl" className="w-[80%] sm:w-[80%] grid grid-cols-1 sm:grid-cols-3 justify-center items-start gap-15 mt-20 sm:mt-0 sm:ml-15">
        {filteredUsers.map((user) =>
          user.type !== "Admin" && (
            <li
              dir="rtl"
              key={user.id}
              className="flex flex-col justify-start items-start w-[220px] h-[360px] border border-[#1E3A8A] rounded-md"
            >
              <div className="img w-full h-[220px]">
                <img
                  className="w-full h-full object-cover rounded-t-md"
                  src={user.profileImg || Admin}
                  alt={user.name}
                />
              </div>
              <div className="relative w-full h-full mt-2">
                <div className="flex w-full justify-start items-start flex-col px-2 gap-1">
                  <p className="text-[17px]">نام : {user.name}</p>
                  <p className="text-[14px]">تحصیلات : {user.study}</p>
                  <p className="text-[14px]">دانشگاه : {user.university}</p>
                </div>
                <div className="absolute left-0 bottom-0 w-full px-2 flex flex-row-reverse justify-between items-center">
                    <Link 
                    title="مشاهده کاربر" 
                    to={`/students/${user.id}`} 
                    className="text-[#1E3A8A]">
                    {user.studentNumber}
                    </Link>

                  <i
                    title="بلاک کاربر"
                    className="fas fa-ban text-yellow-600 text-[18px] cursor-pointer transition-all duration-300 hover:scale-125"
                    onClick={() =>{ setBlockUserId(user.id);setModalOpen(true)}}
                  ></i>
                </div>
              </div>
            </li>
          )
        )}
      </ul>

      {/* {blockUserId && ( */}
        <div
        className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`w-[90%] sm:w-[35%] flex flex-col justify-center items-end bg-[snow] p-5 rounded-lg shadow-xl transform transition-all duration-300
            ${modalOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
        >
          <h2 className="text-lg font-semibold mb-4">آیا می‌خواهید این کاربر را بلاک کنید؟</h2>
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-400 rounded-md text-white cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110"
              onClick={() => setModalOpen(false)}
            >
              لغو
            </button>
            <button
              className="px-4 py-2 bg-yellow-600 rounded-md text-white cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-110"
              onClick={() => {
                handleBlock();
                setModalOpen(false);
              }}
            >
              بلاک
            </button>
          </div>
        </div>
      </div>
      
      {/* )} */}
    </div>
  );
};

export default UsersManagement;
