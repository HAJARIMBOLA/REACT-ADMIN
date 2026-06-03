import { useGetList } from "react-admin";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";

interface StatCardProps {
  title: string;
  value: number | undefined;
  isPending: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, isPending, icon, color }: StatCardProps) => (
  <Card sx={{ border: `2px solid ${color}`, borderRadius: 2 }}>
    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <div style={{ color, fontSize: 40 }}>{icon}</div>
      <div>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        {isPending ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h4" fontWeight="bold" color={color}>
            {value ?? 0}
          </Typography>
        )}
      </div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  // Les 4 useGetList s'exécutent EN PARALLÈLE (React les lance simultanément)
  // Optimisation : perPage:1 pour ne récupérer que le total via X-Total-Count
  const { total: totalEmployees, isPending: p1 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees, isPending: p2 } = useGetList("employees", {
    pagination: { page: 1, perPage: 1 },
    filter: { active: true },
  });

  const { total: totalInterns, isPending: p3 } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: remuneratedInterns, isPending: p4 } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    filter: { isRemunerate: true },
  });

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        📊 Tableau de bord
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total employés"
            value={totalEmployees}
            isPending={p1}
            icon={<PeopleIcon fontSize="inherit" />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Employés actifs"
            value={activeEmployees}
            isPending={p2}
            icon={<CheckCircleIcon fontSize="inherit" />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total stagiaires"
            value={totalInterns}
            isPending={p3}
            icon={<SchoolIcon fontSize="inherit" />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Stagiaires rémunérés"
            value={remuneratedInterns}
            isPending={p4}
            icon={<EuroIcon fontSize="inherit" />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </div>
  );
};
