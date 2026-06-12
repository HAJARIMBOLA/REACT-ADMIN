import { Typography, Grid, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { DashboardCard } from "./components/DashboardCard";
import DashboardCharts from "./components/DashboardCharts";
import { useDashboardStats } from "./hooks/useDashboardStats";

export const Dashboard = () => {
  const {
    totalEmployees,
    activeEmployees,
    totalInterns,
    managersCount,
    avgSalary,
    maxSalary,
    isPending,
  } = useDashboardStats();

  const kpis = [
    {
      title: "Total employés",
      value: totalEmployees,
      icon: <PeopleIcon />,
      color: "#1976d2",
      subtitle: "Tous statuts",
    },
    {
      title: "Employés actifs",
      value: activeEmployees,
      icon: <CheckCircleIcon />,
      color: "#2e7d32",
      subtitle: "Statut actif",
    },
    {
      title: "Stagiaires",
      value: totalInterns,
      icon: <SchoolIcon />,
      color: "#ed6c02",
      subtitle: "Tous stages",
    },
    {
      title: "Managers",
      value: managersCount,
      icon: <ManageAccountsIcon />,
      color: "#0288d1",
      subtitle: "Encadrent des stagiaires",
    },
    {
      title: "Salaire moyen",
      value: avgSalary ? `${avgSalary.toLocaleString("fr-FR")} €` : undefined,
      icon: <EuroIcon />,
      color: "#9c27b0",
      subtitle: "Tous employés",
    },
    {
      title: "Salaire maximum",
      value: maxSalary ? `${maxSalary.toLocaleString("fr-FR")} €` : undefined,
      icon: <TrendingUpIcon />,
      color: "#d32f2f",
      subtitle: "Employé le mieux payé",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        📊 Tableau de bord RH
      </Typography>

      <Grid container spacing={3}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={4} key={kpi.title}>
            <DashboardCard {...kpi} isPending={isPending} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📈 Graphiques
      </Typography>
      <DashboardCharts />
    </div>
  );
};
