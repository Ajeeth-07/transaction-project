import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-gradient-to-r from-blue-400 to-indigo-400 shadow-md py-4 px-6 flex items-center justify-between">
      <div className="text-white font-bold text-xl">Transaction Project</div>
      <div className="flex items-center space-x-4">
        <div className="text-white font-medium">Hello, User!</div>
        <Button
          label="History"
          onClick={() => navigate("/history")}
          extraClasses="bg-white text-blue-500 hover:bg-gray-200 px-3 py-1 rounded"
        />
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg text-blue-600 font-bold">
            U
          </div>
          <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 px-3 py-1 rounded transition duration-150"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
