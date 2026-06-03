import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  ReferenceField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";
import { ManagerCard } from "./ManagerCard";

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
      {/* Manager comme lien cliquable vers sa fiche employé */}
      <ReferenceField source="managerId" reference="employees" label="Manager" link="show">
        <TextField source="firstname" /> <TextField source="lastname" />
      </ReferenceField>
      <BooleanField source="isRemunerate" label="Rémunéré" />
      <NumberField
        source="remuneration"
        label="Rémunération"
        options={{ style: "currency", currency: "EUR" }}
      />
      <TextField source="startDate" label="Date de début" />
      <TextField source="endDate" label="Date de fin" />
      {/* Composant custom ManagerCard utilisant useGetOne */}
      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
