import {
  Apple as AppleIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  LockOpen as LockOpenIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "acceptTerms" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      // Implémentez ici votre logique d'inscription
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <LockOpenIcon
            sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }}
          />
          <Typography component="h1" variant="h5" gutterBottom>
            Inscription
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nom complet"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Numéro de téléphone"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTerms"
                  color="primary"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
              }
              label={
                <Typography variant="body2">
                  J'accepte les{" "}
                  <Link href="/terms" target="_blank">
                    conditions générales
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" target="_blank">
                    politique de confidentialité
                  </Link>
                </Typography>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !formData.acceptTerms}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Link href="/login" variant="body2">
                {"Déjà inscrit ? Se connecter"}
              </Link>
            </Box>

            <Divider sx={{ my: 2 }}>ou</Divider>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <IconButton sx={{ color: "#DB4437" }}>
                <GoogleIcon />
              </IconButton>
              <IconButton sx={{ color: "#4267B2" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#000000" }}>
                <AppleIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
