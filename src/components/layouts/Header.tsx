import { Link } from "react-router-dom";
import { MAIN_ROUTES } from "../../constants/routes";
import { useSmartAccountClient } from "@account-kit/react";
import { formatAddress } from "../../utils/libs";
import { Dropdown } from "../ui/Dropdown";
import { useRoleSignAndLogin } from "@/hooks/useRoleSignAndLogin";
interface HeaderProps {
  collapsed: boolean;
}

const Header = ({ collapsed }: HeaderProps) => {
  const { client } = useSmartAccountClient({});
  const { handleLogout } = useRoleSignAndLogin();
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ${
        collapsed ? "pl-[72px]" : "pl-[250px]"
      } max-md:pl-0`}
    >
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to={MAIN_ROUTES.HOME} className="text-xl font-bold text-primary">
          FoodTrace 🌿
        </Link>
        <nav className="flex gap-4 text-gray-600 font-medium">
          <Link to={MAIN_ROUTES.HOME} className="hover:text-primary">
            Home
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
        </nav>
        <Dropdown
          label={formatAddress(client?.account.address ?? "")}
          items={[
            { label: "View profile", onClick: () => alert("View Profile") },
            { label: "Settings", onClick: () => alert("Settings clicked") },
            { label: "Logout", onClick: () => handleLogout() },
          ]}
        />
      </div>
    </header>
  );
};

export default Header;
