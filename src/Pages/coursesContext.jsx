import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Userimg from "./img/userIMG.png"


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};


export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/me`,
          { withCredentials: true }
        );

        const u = response.data?.user;

        if (u) {
          setUser({
            coursesId: u?.CourseId,
            name: u?.name,
            studentNumber: u?.UserID,
            type: u?.role || "",
            profileImg: u?.profilePic || Userimg,
            email: u?.email,
            study: u?.study,
            university: u?.university,
            aboutMe: u?.aboutMe,
            reqToTeach : response.data.user.requestTeacher,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("fetchUser error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};


// دسترسی سریع‌تر در کامپوننت‌ها
export const useUser = () => useContext(UserContext);

export const useSearch = () => useContext(SearchContext);
