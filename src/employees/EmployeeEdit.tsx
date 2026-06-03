import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  useRecordContext
} from "react-admin";

const EmployeeTitle = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <span>
      Modifier : {record.firstname} {record.lastname}
    </span>
  );
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />}>
    <SimpleForm>
      <TextInput
        source="firstname"
        validate={required()}
      />

      <TextInput
        source="lastname"
        validate={required()}
      />

      <TextInput
        source="email"
        validate={required()}
      />

      <SelectInput
        source="department"
        validate={required()}
        choices={[
          { id: "Informatique", name: "Informatique" },
          { id: "Marketing", name: "Marketing" },
          { id: "RH", name: "RH" },
          { id: "Finance", name: "Finance" }
        ]}
      />

      <NumberInput
        source="salary"
        validate={[
          required(),
          minValue(1500)
        ]}
      />

      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
);