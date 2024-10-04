import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <button
      className="bg-slate-300 text-xl rounded py-2 px-4 hover:text-red-500"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
