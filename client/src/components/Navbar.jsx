import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        Peer Tutoring
      </Link>
      <Link to="/users" className="mr-4 hover:underline transition">All Users</Link>

      <div>
        {user ? (
          <>
            <Link
              to="/logout"
              className="flex items-center gap-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              <span>{user.name}</span>
              <span>Logout</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mr-4 hover:underline transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
      
    </nav>
  );
}
