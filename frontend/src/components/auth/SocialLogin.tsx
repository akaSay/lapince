import {
  Apple as AppleIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";

export const SocialLogin = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-400 bg-gray-800">
            Ou continuer avec
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button className="flex items-center justify-center p-3 transition-colors duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
          <GoogleIcon className="text-white" />
        </button>
        <button className="flex items-center justify-center p-3 transition-colors duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
          <FacebookIcon className="text-white" />
        </button>
        <button className="flex items-center justify-center p-3 transition-colors duration-200 bg-gray-700 rounded-lg hover:bg-gray-600">
          <AppleIcon className="text-white" />
        </button>
      </div>
    </>
  );
};
