import { createContext, useState } from "react";

export const CaptionDataContext = createContext({
  caption: null,
  setcaption: () => {},
});

const CaptionContext = ({ children }) => {
  const [caption, setcaption] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  return (
    <CaptionDataContext.Provider value={{ caption, setcaption }}>
      {children}
    </CaptionDataContext.Provider>
  );
};

export default CaptionContext;
