import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  ReferenceField,
  EditButton,
  DeleteButton,
  SelectInput,
  useCreate,
  useNotify,
  useRefresh,
  useGetList,
} from "react-admin";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as MuiTextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const internFilters = [
  <SelectInput
    key="department"
    source="department"
    label="Département"
    alwaysOn
    emptyText="Tous les départements"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
  <SelectInput
    key="isRemunerate"
    source="isRemunerate"
    label="Rémunéré"
    alwaysOn
    emptyText="Tous"
    choices={[
      { id: true, name: "Oui" },
      { id: false, name: "Non" },
    ]}
  />,
];

// Exercice 11 — Modale création rapide avec useCreate
const QuickAddInternModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [managerId, setManagerId] = useState<number | "">("");
  const [error, setError] = useState("");

  const [create, { isPending }] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();

  const { data: managers } = useGetList("employees", {
    pagination: { page: 1, perPage: 100 },
    filter: { active: true },
  });

  const handleSubmit = () => {
    setError("");
    if (!firstname.trim() || !lastname.trim() || !managerId) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    create(
      "interns",
      {
        data: {
          firstname: firstname.trim(),
          lastname: lastname.trim(),
          managerId: Number(managerId),
          isRemunerate: false,
          remuneration: null,
        },
      },
      {
        onSuccess: () => {
          notify("Stagiaire créé avec succès", { type: "success" });
          refresh();
          onClose();
          setFirstname("");
          setLastname("");
          setManagerId("");
        },
        onError: () => {
          setError("Erreur lors de la création. Veuillez réessayer.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ajouter un stagiaire rapidement</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <MuiTextField
          label="Prénom *"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          fullWidth
        />
        <MuiTextField
          label="Nom *"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Manager *</InputLabel>
          <Select
            value={managerId}
            label="Manager *"
            onChange={(e) => setManagerId(e.target.value as number)}
          >
            {managers?.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.firstname} {m.lastname} — {m.department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isPending}
        >
          {isPending ? "Création..." : "Créer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const QuickAddButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{ mb: 1 }}
      >
        Ajouter stagiaire rapide
      </Button>
      <QuickAddInternModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const InternList = () => (
  <>
    <QuickAddButton />
    <List filters={internFilters} perPage={5}>
      <Datagrid rowClick="show">
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="department" label="Département" />
        <ReferenceField
          source="managerId"
          reference="employees"
          label="Manager"
        >
          <TextField source="firstname" /> <TextField source="lastname" />
        </ReferenceField>
        <BooleanField source="isRemunerate" label="Rémunéré" />
        <NumberField
          source="remuneration"
          label="Rémunération"
          options={{ style: "currency", currency: "EUR" }}
        />
        <TextField source="startDate" label="Début" />
        <TextField source="endDate" label="Fin" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  </>
);
