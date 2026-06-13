import { AppBar, TitlePortal, ToggleThemeButton } from "react-admin";
import { Box, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { lightTheme } from "../themes/lightTheme";
import { darkTheme } from "../themes/darkTheme";

export const CustomAppBar = () => (
  <AppBar>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 1 }}>
      <GroupsIcon />
      <Typography variant="h6" fontWeight="bold" sx={{ display: { xs: "none", sm: "block" } }}>
        RH Admin
      </Typography>
    </Box>
    <TitlePortal />
    <ToggleThemeButton lightTheme={darkTheme} />
  </AppBar>
);
