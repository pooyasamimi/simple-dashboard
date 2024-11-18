import Swal from "sweetalert2";

export const Confirm = (title, text, icon, confirmButtonText) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText,
    })
}
export const Alert = (text) => {
    Swal.fire(text);
}