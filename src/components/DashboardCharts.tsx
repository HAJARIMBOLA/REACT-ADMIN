import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useGetList } from "react-admin";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

const COLORS = ["#1976d2", "#ed6c02", "#2e7d32", "#9c27b0", "#0288d1"];

export default function DashboardCharts() {
  const { data: employees, isPending } = useGetList("employees", {
    pagination: { page: 1, perPage: 1000 },
  });

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Group by department
  const deptMap: Record<string, number> = {};
  employees?.forEach((e) => {
    deptMap[e.department] = (deptMap[e.department] ?? 0) + 1;
  });
  const departmentData = Object.entries(deptMap).map(([department, count]) => ({
    department,
    count,
  }));

  // Active vs inactive
  const activeCount = employees?.filter((e) => e.active).length ?? 0;
  const inactiveCount = (employees?.length ?? 0) - activeCount;
  const statusData = [
    { name: "Actifs", value: activeCount },
    { name: "Inactifs", value: inactiveCount },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 2 }}>
      {/* Bar chart by department */}
      <Paper sx={{ p: 3, flex: "1 1 400px", borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Employés par département
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Pie chart active/inactive */}
      <Paper sx={{ p: 3, flex: "1 1 300px", borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Statut des employés
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {statusData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
