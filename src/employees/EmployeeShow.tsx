import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ImageField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";
import { InternsByManager } from "./InternsByManager";
import { DepartmentStats } from "./DepartmentStats";

const EmployeeShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<EmployeeShowActions />}>
    <SimpleShowLayout>
      <ImageField source="avatar.src" label="Photo" />
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
      <DateField source="createdAt" label="Créé le" showTime />
      <DateField source="updatedAt" label="Mis à jour le" showTime />
      <InternsByManager />
      <DepartmentStats />
    </SimpleShowLayout>
  </Show>
);
