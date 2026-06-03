import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  SearchInput,
  SelectInput
} from "react-admin";

const employeeFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <SelectInput
    key="department"
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" }
    ]}
  />
];

export const EmployeeList = () => (
  <List filters={employeeFilters} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="email" />
      <TextField source="department" />

      <NumberField
        source="salary"
        options={{
          style: "currency",
          currency: "EUR"
        }}
      />

      <BooleanField source="active" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);