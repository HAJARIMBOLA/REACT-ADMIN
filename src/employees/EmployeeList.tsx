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
} from "react-admin";
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

export const EmployeeList = () => (
  <List filters={employeeFilters} perPage={5}>
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
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
