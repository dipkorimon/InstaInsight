"use client";

import {useEffect, useRef, useState} from "react";
import {FiCpu, FiMic, FiSend} from "react-icons/fi";

export default function ChatBox() {
    const [messages, setMessages] = useState([
        {id: 1, from: "assistant", text: "Hello! I'm InstaInsight. How can I help you?"},
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages, isTyping]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {id: Date.now(), from: "user", text: input.trim()};
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const assistantReply = await simulateTypingResponse(
            "This is a simulated reply for UI testing. I will replace this with API call."
        );

        setMessages((prev) => [
            ...prev,
            {id: Date.now() + 1, from: "assistant", text: assistantReply},
        ]);
        setIsTyping(false);
    };

    const simulateTypingResponse = (text) =>
        new Promise((resolve) => setTimeout(() => resolve(text), 1000));

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full w-200">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-hidden">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.from === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm whitespace-pre-wrap text-sm ${
                                msg.from === "user"
                                    ? "bg-gray-200 rounded-4xl"
                                    : "bg-gray-200 rounded-4xl"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-xl rounded-bl-none">
                            <TypingIndicator/>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef}/>
            </div>




            <div className="px-4 py-3 w-200 sticky bottom-0 bg-gray-200 rounded-4xl max-w-3xl mx-auto">
                <div className="flex flex-col gap-1">
                    {/* Textarea with transparent bg */}
                    <textarea
                        rows={1}
                        className="w-full rounded-t-xl px-4 py-3 text-sm bg-transparent font-bold-medium focus:outline-none resize-none placeholder-gray-500 shadow-none max-h-40 overflow-y-auto scrollbar-hide"
                        placeholder="Send a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    {/* Bottom row with Tools text and icons */}
                    <div className="flex items-center justify-between rounded-b-xl px-4 py-2">
                        <div className="text-gray-600 font-sm select-none">
                            <button
                                type="button"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-1 cursor-pointer rounded-md border border-gray-300 transition"
                                aria-label="Insight IQ feature"
                            >
                                <FiCpu size={20} />
                                <span>InsightIQ</span>
                            </button>

                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                aria-label="Start microphone"
                                type="button"
                            >
                                <FiMic size={20} />
                            </button>

                            <button
                                onClick={sendMessage}
                                disabled={!input.trim()}
                                className="text-gray-800 disabled:text-gray-400 cursor-pointer"
                                type="button"
                                aria-label="Send message"
                            >
                                <FiSend  size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
}

function TypingIndicator() {
    return (
        <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"/>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"/>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"/>
        </div>
    );
}
