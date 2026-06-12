import { Menu } from "react-admin";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const CustomMenu = () => (
  <Menu>
    <Menu.DashboardItem leftIcon={<DashboardIcon />} />
    <Menu.ResourceItem name="employees" leftIcon={<PeopleIcon />} />
    <Menu.ResourceItem name="interns" leftIcon={<SchoolIcon />} />
  </Menu>
);
