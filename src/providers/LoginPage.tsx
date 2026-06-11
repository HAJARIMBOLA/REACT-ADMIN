import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import {
  Box, Card, CardContent, TextField, Button, Typography, Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // password is passed straight through to authProvider.login and
      // is never written to any client-side storage.
      await login({ username: email, password });
    } catch {
      notify("Invalid email or password", { type: "error" });
    } finally {
      // Clear the local field state regardless of outcome
      setPassword("");
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #1e293b, #0f172a)",
      }}
    >
      <Card sx={{ width: 380, borderRadius: 3, p: 1 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h6" fontWeight={700}>HR Admin</Typography>
            <Typography variant="body2" color="text.secondary">Sign in to continue</Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="username"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" disabled={submitting} fullWidth>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Notification />
    </Box>
  );
};
