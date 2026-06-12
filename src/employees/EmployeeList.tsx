import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  SearchInput,
  SelectInput,
  usePermissions,
  ShowButton,
} from "react-admin";
import { exporter } from "../components/CsvExporter";
import { QuickStatusToggle } from "./QuickStatusToggle";

const employeeFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <SelectInput
    key="department"
    source="department"
    label="Département"
    emptyText="Tous les départements"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
];

export const EmployeeList = () => {
  const { permissions } = usePermissions();
  const isAdmin = permissions === "admin";

  return (
    <List filters={employeeFilters} perPage={10} exporter={exporter}>
      <Datagrid rowClick="show">
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />
        <NumberField
          source="salary"
          label="Salaire"
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source="active" label="Actif" />
        {/* Exercice 10 — Bouton activer/désactiver avec useUpdate */}
        <QuickStatusToggle />
        {(permissions === "admin" || permissions === "manager") && <EditButton />}
        {isAdmin && <DeleteButton />}
      </Datagrid>
    </List>
  );
};
