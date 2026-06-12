import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: number | string | undefined;
  isPending?: boolean;
  icon: ReactNode;
  color: string;
  subtitle?: string;
}

export const DashboardCard = ({
  title,
  value,
  isPending = false,
  icon,
  color,
  subtitle,
}: DashboardCardProps) => (
  <Card
    sx={{
      border: `2px solid ${color}`,
      borderRadius: 3,
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 8px 24px ${color}33`,
      },
    }}
  >
    <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 3 }}>
      <Box
        sx={{
          color: "white",
          bgcolor: color,
          borderRadius: "50%",
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          "& svg": { fontSize: 28 },
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
        {isPending ? (
          <CircularProgress size={28} sx={{ color }} />
        ) : (
          <Typography variant="h4" fontWeight="bold" color={color} lineHeight={1.2}>
            {value ?? 0}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);
