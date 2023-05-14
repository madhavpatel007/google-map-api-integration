import { toast } from "react-toastify";

export const displayToast = (status, message) => {
  switch (status) {
    case "SUCCESS":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "ERROR":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "WARNING":
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    case "INFO":
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      break;
    default:
      break;
  }
};
