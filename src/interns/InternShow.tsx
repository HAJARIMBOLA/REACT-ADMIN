import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ImageField,
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
      <ImageField source="avatar.src" label="Photo" />
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <TextField source="department" label="Département" />
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
      <DateField source="createdAt" label="Créé le" showTime />
      <DateField source="updatedAt" label="Mis à jour le" showTime />
      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
