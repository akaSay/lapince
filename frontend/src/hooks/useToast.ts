import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useToast = () => {
  const { t } = useTranslation();

  return {
    success: (message: string) => {
      toast.success(t(message));
    },
    error: (message: string) => {
      toast.error(t(message));
    },
    warning: (message: string) => {
      toast.warning(t(message));
    },
    info: (message: string) => {
      toast.info(t(message));
    },
  };
};
