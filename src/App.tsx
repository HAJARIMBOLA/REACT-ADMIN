import { Admin, Resource } from "react-admin";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";

import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternEdit } from "./interns/InternEdit";
import { InternShow } from "./interns/InternShow";

import { Dashboard } from "./Dashboard";
import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./providers/LoginPage";

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      dashboard={Dashboard}
      requireAuth
    >
      <Resource
        name="employees"
        list={EmployeeList}
        create={EmployeeCreate}
        edit={EmployeeEdit}
        show={EmployeeShow}
        options={{ label: "Employees" }}
      />
      <Resource
        name="interns"
        list={InternList}
        create={InternCreate}
        edit={InternEdit}
        show={InternShow}
        options={{ label: "Interns" }}
      />
    </Admin>
  );
}

export default App;
