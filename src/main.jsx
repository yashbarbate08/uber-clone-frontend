import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptionContext from "./context/CaptionContext.jsx";
// import SocketIoProvider from "./context/SocketIoContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <CaptionContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </CaptionContext>
    </SocketProvider>
  </StrictMode>
);
