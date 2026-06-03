import { useRecordContext, useGetOne } from "react-admin";
import { Card, CardContent, Typography, Chip, CircularProgress, Alert } from "@mui/material";

export const ManagerCard = () => {
  // useRecordContext : lit l'enregistrement du stagiaire courant
  const intern = useRecordContext();

  // useGetOne : charge le manager, désactivé si managerId est undefined
  const { data, isPending, error } = useGetOne(
    "employees",
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  if (!intern) return null;

  // État 1 : chargement en cours
  if (isPending) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CircularProgress size={20} />
          <Typography>Chargement du manager...</Typography>
        </CardContent>
      </Card>
    );
  }

  // État 2 : erreur
  if (error) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Alert severity="error">Impossible de charger les informations du manager.</Alert>
        </CardContent>
      </Card>
    );
  }

  // État 3 : données disponibles
  return (
    <Card sx={{ mt: 2, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          👤 Manager
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {data?.firstname} {data?.lastname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.department}
        </Typography>
        <Typography variant="body2">
          <a href={`mailto:${data?.email}`}>{data?.email}</a>
        </Typography>
        <Chip
          label={data?.active ? "Actif" : "Inactif"}
          color={data?.active ? "success" : "default"}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};
