import { useUpdate, useRecordContext, useNotify, useRefresh } from "react-admin";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update(
      "employees",
      {
        id: record.id,
        data: { ...record, active: !record.active },
        previousData: record,
      },
      {
        onSuccess: () => {
          notify(
            `${record.firstname} ${record.lastname} est maintenant ${!record.active ? "actif" : "inactif"}.`,
            { type: "success" }
          );
          refresh();
        },
        onError: () => {
          notify("Erreur lors de la mise à jour du statut.", { type: "error" });
        },
      }
    );
  };

  return (
    <Button
      variant="outlined"
      size="small"
      disabled={isPending}
      onClick={(e) => {
        e.stopPropagation(); // Évite le rowClick
        handleToggle();
      }}
      color={record.active ? "error" : "success"}
      startIcon={record.active ? <CancelIcon /> : <CheckCircleIcon />}
    >
      {isPending ? "..." : record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};
