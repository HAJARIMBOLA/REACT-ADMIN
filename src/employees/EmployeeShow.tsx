import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
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
      {/* Exercice 9.1 — Stagiaires encadrés */}
      <InternsByManager />
      {/* Exercice 9.2 — Stats du département */}
      <DepartmentStats />
    </SimpleShowLayout>
  </Show>
);
