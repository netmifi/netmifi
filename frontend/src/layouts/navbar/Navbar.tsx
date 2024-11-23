import UserNavbar from "./user/Index";
import GuestNavbar from "./guest/Index";
import { useStoreState } from "@/store/store";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { isAuth } = useApp();
  const { pathname } = useLocation();
  return (
    <nav className="sticky top-0 z-20">
      {isAuth ? <UserNavbar /> : <GuestNavbar />}
    </nav>
  );
};

export default Navbar;
