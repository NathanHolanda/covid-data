import { Bounce, toast, TypeOptions } from "react-toastify";

// função para disparar toast
export default function getToast(message: string, type: TypeOptions) {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type,
  });
}
