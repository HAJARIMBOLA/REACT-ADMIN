import { useRecordContext, useGetList } from "react-admin";
import {
  Card, CardContent, Typography, List, ListItem,
  ListItemText, Divider, Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

export const InternsByManager = () => {
  const employee = useRecordContext();

  // total provient du header X-Total-Count du serveur — valeur exacte
  const { data: interns, total, isPending } = useGetList(
    "interns",
    {
      pagination: { page: 1, perPage: 100 },
      filter: { managerId: employee?.id },
    },
    { enabled: !!employee?.id }
  );

  if (!employee) return null;
  if (isPending) return <Typography>Chargement des stagiaires...</Typography>;

  return (
    <Card sx={{ mt: 2, border: "1px solid #e0e0e0" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🎓 Stagiaires encadrés ({total ?? 0})
        </Typography>
        {!total || total === 0 ? (
          <Typography color="text.secondary">
            Aucun stagiaire rattaché à cet employé.
          </Typography>
        ) : (
          <List dense>
            {interns?.map((intern) => (
              <div key={intern.id}>
                <ListItem
                  secondaryAction={
                    <Chip
                      label={intern.isRemunerate ? "Rémunéré" : "Non rémunéré"}
                      color={intern.isRemunerate ? "success" : "default"}
                      size="small"
                    />
                  }
                >
                  <ListItemText
                    primary={
                      <Link to={`/interns/${intern.id}/show`}>
                        {intern.firstname} {intern.lastname}
                      </Link>
                    }
                    secondary={`${intern.department} — ${intern.startDate} → ${intern.endDate}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
