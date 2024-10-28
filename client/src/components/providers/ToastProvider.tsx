import { ToastContainer, ToastContainerProps } from "react-toastify";

const toastConfig: ToastContainerProps = {
    position: "bottom-right",
    autoClose: 3000,
    newestOnTop: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "light",
};

export default function ToastProvider() {
    return <ToastContainer {...toastConfig} />;
}
