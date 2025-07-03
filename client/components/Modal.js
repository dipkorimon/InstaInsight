import CloseButton from "@/components/CloseButton";

export default function Modal(props) {
    return (
        <div
            className="fixed inset-0 z-50 grid place-content-center bg-black/50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
        >
            <div className="w-full max-w-md rounded-lg bg-white px-4 py-3 shadow-lg">
                <div className="flex justify-between">
                    <h2 id="modalTitle" className="text-xl font-bold text-gray-900">{props.title}</h2>
                    <CloseButton onClose={props.onClose} />
                </div>

                <div className="mt-4">
                    {/*Modal content*/}
                </div>
            </div>
        </div>
    );
}
