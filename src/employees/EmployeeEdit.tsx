import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  ImageInput,
  ImageField,
  required,
  minValue,
  useRecordContext,
} from "react-admin";
import { validateName, validateEmail } from "../utils/validators";

const DEPARTMENTS = [
  { id: "Informatique", name: "Informatique" },
  { id: "Marketing", name: "Marketing" },
  { id: "RH", name: "RH" },
  { id: "Finance", name: "Finance" },
];

const EmployeeTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <span>Modifier : {record.firstname} {record.lastname}</span>;
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm>
      <ImageInput source="avatar" label="Photo de profil" accept={{ "image/*": [] }}>
        <ImageField source="src" title="title" />
      </ImageInput>

      <TextInput source="firstname" label="Prénom" validate={validateName} />
      <TextInput source="lastname" label="Nom" validate={validateName} />
      <TextInput source="email" label="Email" validate={validateEmail} />

      <SelectInput
        source="department"
        label="Département"
        validate={required()}
        choices={DEPARTMENTS}
      />

      <NumberInput
        source="salary"
        label="Salaire (€)"
        validate={[required(), minValue(1500)]}
      />

      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);
