import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Outlet />
    </main>
  );
};

export default BlankLayout;
