import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
  rememberMe: yup.boolean(),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});
