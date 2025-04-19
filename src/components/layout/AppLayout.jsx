import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// Unused since Tailwind does not support dynamic classes https://www.reddit.com/r/tailwindcss/comments/14cc9m1/tailwind_styles_not_working_when_passed_as_a/
const sidebarWidth = 64;
const headerHeightPixels = 80;

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <Header />

      <div className={`mt-[80px] ${isSidebarOpen ? `ml-0 md:ml-64` : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;