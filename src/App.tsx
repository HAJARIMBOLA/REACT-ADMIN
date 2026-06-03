import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { EmployeeList } from "./employees/EmployeeList.tsx";
import { EmployeeCreate } from "./employees/EmployeeCreate.tsx";
import { EmployeeEdit } from "./employees/EmployeeEdit.tsx";
import { EmployeeShow } from "./employees/EmployeeShow.tsx";

const dataProvider = jsonServerProvider(
  "http://localhost:3002"
);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="employees"
        list={EmployeeList}
        create={EmployeeCreate}
        edit={EmployeeEdit}
        show={EmployeeShow}
      />
    </Admin>
  );
}

export default App;