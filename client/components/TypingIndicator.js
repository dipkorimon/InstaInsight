export default function TypingIndicator() {
    return (
        <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"/>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"/>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"/>
        </div>
    );
}