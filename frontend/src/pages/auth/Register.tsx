import { Formik, Form, Field } from "formik";
import { useAuth } from "../../hooks/useAuth";
import { registerSchema } from "../../schemas/auth";
import { RegisterFormValues } from "../../types/auth";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { SocialLogin } from "../../components/auth/SocialLogin";

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Register = () => {
  const { register, error: authError, loading } = useAuth();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.error("Erreur d'inscription:", err);
    }
  };

  return (
    <AuthLayout
      title="Inscription"
      subtitle="Rejoignez-nous et commencez à gérer votre budget"
    >
      {authError && (
        <div className="p-4 text-sm text-red-500 border rounded-lg bg-red-500/10 border-red-500/50">
          {authError}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Nom complet
              </label>
              <Field
                type="text"
                name="name"
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Votre nom"
              />
              {errors.name && touched.name && (
                <div className="text-sm text-red-500">{errors.name}</div>
              )}
            </div>

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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Confirmer le mot de passe
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="text-sm text-red-500">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </Form>
        )}
      </Formik>

      <SocialLogin />

      <p className="mt-6 text-center text-gray-400">
        Déjà inscrit ?{" "}
        <a href="/login" className="text-blue-400 hover:text-blue-300">
          Se connecter
        </a>
      </p>
    </AuthLayout>
  );
};

export default Register;
