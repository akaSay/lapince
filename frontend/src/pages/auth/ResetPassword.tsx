import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError(t("errors.passwordsDoNotMatch"));
      return;
    }

    try {
      await resetPassword(resetToken!, formData.password);
      navigate("/login", { state: { message: t("success.passwordReset") } });
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
        <Typography component="h1" variant="h5" sx={{ color: "white" }}>
          {t("auth.resetPassword")}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("common.newPassword")}
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t("common.confirmPassword")}
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
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
              "& .MuiFormHelperText-root": { color: "error.main" },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("auth.resetPassword")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
