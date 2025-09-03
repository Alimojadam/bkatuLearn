import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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

  const [newUser, setNewUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/me`, { withCredentials: true });
      setNewUser(res.data);
      setUser({
        ...user,
        coursesId: res.data.CourseId,
        name: res.data.name,
        studentNumber: res.data.UserID,
        type: res.data.role,
        profileImg: res.data.profilePic,
        email: res.data.email,
      });
    } catch (err) {
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
