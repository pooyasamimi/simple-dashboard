import React from 'react'
import Swal from 'sweetalert2'

export default function WithAlerts(MainComponent) {
    function NewComponent(props) {

        const Confirm = (title, text, icon, confirmButtonText) => {
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
        const Alert = (text) => {
            Swal.fire(text);
        }
        return <MainComponent {...props} Confirm={Confirm} Alert={Alert} />
    }
    return NewComponent
}
