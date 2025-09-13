import { createContext, useState } from "react";

export const UserDataContext = createContext({
  user: null,
  setuser: () => {},
});

const UserContext = ({ children }) => {
  const [user, setuser] = useState({
    fullname: { firstname: "", lastname: "" },
    email: "",
    password: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
