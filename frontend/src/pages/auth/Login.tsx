import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { SocialLogin } from "../../components/auth/SocialLogin";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/auth";
import { LoginFormValues } from "../../types/auth";

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const { login, error: authError, loading } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
    } catch (err) {
      console.error("Erreur de connexion:", err);
    }
  };

  return (
    <AuthLayout title="Connexion" subtitle="Gérez votre budget simplement">
      {authError && (
        <div className="p-4 text-sm text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
          {authError}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Adresse email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="vous@exemple.com"
              />
              {errors.email && touched.email && (
                <div className="text-sm text-red-500">{errors.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Mot de passe
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.password && touched.password && (
                <div className="text-sm text-red-500">{errors.password}</div>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </Form>
        )}
      </Formik>

      <SocialLogin />

      <p className="mt-6 text-center text-gray-400">
        Pas encore de compte ?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          S'inscrire
        </Link>
      </p>
    </AuthLayout>
  );
};
export default Login;
