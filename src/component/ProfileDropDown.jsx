import { logout } from "@/app/redux/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function ProfileDropDown({ show, setShow }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const userId = useSelector((state) => state.auth.user);
  const { token } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    console.log("Sign out clicked");
    try {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");
      const response = await axios.get("/api/users/logout");
      console.log(response);
      if (response.status === 200) {
        router.push("/");
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Log out error");
    }
  };

  const handleExit = () => {
    setShow(!show);
  };

  return (
    <div
      className={`mr-5 absolute top-12 right-0 z-50 ${
        show ? "block" : "hidden"
      } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 w-[10rem] `}
    >
      <div
        onClick={handleExit}
        className="absolute top-1 right-2 text-red-700 text-base font-semibold cursor-pointer"
      >
        X
      </div>
      <ul className="py-2">
        <>
          <Link
            href={`/dashboard`}
            // href = {token ? `/profile/${userId}` : '/login'}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Dashboard
          </Link>
        </>
        <li>
          <Link
            href={"/dashboard/setting"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link
            href={`/dashboard/profile/${userId}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Profile
          </Link>
        </li>
        <li>
          <span
            onClick={handleLogout}
            className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropDown;
