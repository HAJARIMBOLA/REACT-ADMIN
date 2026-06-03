import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  required,
  email,
  minValue,
} from "react-admin";
import { useWatch } from "react-hook-form";

const DEPARTMENTS = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

// Champ remuneration conditionnel — visible seulement si isRemunerate est coché
const RemunerationField = () => {
  const isRemunerate = useWatch({ name: "isRemunerate" });
  if (!isRemunerate) return null;
  return (
    <NumberInput
      source="remuneration"
      label="Rémunération (€)"
      validate={[required(), minValue(0)]}
    />
  );
};

// Filtre dynamique des managers : même département + actif
const ManagerReferenceInput = () => {
  const department = useWatch({ name: "department" });
  return (
    <ReferenceInput
      source="managerId"
      reference="employees"
      filter={{ department, active: true }}
    >
      <SelectInput
        label="Manager"
        optionText={(record) => `${record.firstname} ${record.lastname}`}
        validate={required()}
      />
    </ReferenceInput>
  );
};

export const InternCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={[required(), email()]} />
      <SelectInput
        source="department"
        label="Département"
        validate={required()}
        choices={DEPARTMENTS}
      />
      <ManagerReferenceInput />
      <BooleanInput source="isRemunerate" label="Rémunéré ?" defaultValue={false} />
      <RemunerationField />
      <TextInput source="startDate" label="Date de début" validate={required()} />
      <TextInput source="endDate" label="Date de fin" validate={required()} />
    </SimpleForm>
  </Create>
);
