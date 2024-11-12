import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(t("errors.resetPassword"));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="white" mb={3}>
          {t("auth.forgotPassword")}
        </Typography>

        {isSubmitted ? (
          <Box mt={3}>
            <Typography color="white">{t("auth.resetEmailSent")}</Typography>
            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              {t("auth.backToLogin")}
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("common.email")}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{
                "& label": { color: "gray" },
                "& label.Mui-focused": { color: "primary.main" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                  "& input": { color: "white" },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("auth.sendResetLink")}
            </Button>
            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="text"
              sx={{ color: "gray" }}
            >
              {t("auth.backToLogin")}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
