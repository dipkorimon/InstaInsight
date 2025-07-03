import {IoMdClose} from "react-icons/io";

export default function CloseButton(props) {
    return (
        <button
            type="button"
            onClick={props.onClose}
            className="-me-3 -mt-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none cursor-pointer"
            aria-label="Close"
        >
            <IoMdClose size={20} />
        </button>
    )
}