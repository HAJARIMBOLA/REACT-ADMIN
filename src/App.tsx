import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";

import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternEdit } from "./interns/InternEdit";
import { InternShow } from "./interns/InternShow";

import { Dashboard } from "./Dashboard";
import { Layout } from "./Layout";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./providers/LoginPage";
import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";
import NotFound from "./components/NotFound";
import { exporter } from "./components/CsvExporter";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={Dashboard}
      layout={Layout}
      theme={lightTheme}
      darkTheme={darkTheme}
      requireAuth
    >
      {(permissions) => (
        <>
          {/* Admin sees both resources; other roles see only interns */}
          {permissions === "admin" && (
            <Resource
              name="employees"
              list={EmployeeList}
              create={EmployeeCreate}
              edit={EmployeeEdit}
              show={EmployeeShow}
              icon={PeopleIcon}
              options={{ label: "Employés" }}
              recordRepresentation={(r) => `${r.firstname} ${r.lastname}`}
            />
          )}
          <Resource
            name="interns"
            list={InternList}
            create={InternCreate}
            edit={InternEdit}
            show={InternShow}
            icon={SchoolIcon}
            options={{ label: "Stagiaires" }}
            recordRepresentation={(r) => `${r.firstname} ${r.lastname}`}
          />
        </>
      )}
    </Admin>
  );
}

export default App;
