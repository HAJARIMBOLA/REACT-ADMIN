import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  // Optimisation : perPage:1 pour ne récupérer que le total (X-Total-Count)
  // sans charger tous les employés du département
  const { total, isPending } = useGetList(
    "employees",
    {
      pagination: { page: 1, perPage: 1 },
      filter: { department: employee?.department, active: true },
    },
    { enabled: !!employee?.department }
  );

  if (!employee) return null;

  // Le total inclut l'employé lui-même, donc on soustrait 1 pour les collègues
  const colleagues = isPending ? "..." : Math.max(0, (total ?? 1) - 1);

  return (
    <Card sx={{ mt: 2, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🏢 Département : {employee.department}
        </Typography>
        <Typography variant="body1">
          Collègues actifs dans ce département :{" "}
          <strong>{colleagues}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};
