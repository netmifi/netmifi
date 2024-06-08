import { useStoreState } from "easy-peasy";
import UserNavbar from "./user/Index";
import GuestNavbar from "./guest/Index";
import { logo } from "@/assets/svg";

const Navbar = () => {
  const isAuth = useStoreState((state) => state.isAuth);

  return (
    <nav className="sticky top-0 z-20">
      {
        isAuth ?
          <UserNavbar /> :
          <GuestNavbar />
      }
    </nav>
  )
}

export default Navbar