import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between items-center px-4">
      <div>Transaction Project</div>
      <div className="flex items-center">
        <div className="mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl">
          U
        </div>
        <div className="items-center pt-1 ml-2">
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 flex-row-reverse"
            onClick={handleLogout}
          >
            <svg
              className="w-5 h-5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
