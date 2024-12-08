import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">LaPince</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        <div className="p-6 space-y-6 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
          <h2 className="text-2xl font-semibold text-center text-white">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};
