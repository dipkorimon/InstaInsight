"use client";

import {useEffect, useRef, useState} from "react";
import TypingIndicator from "@/components/TypingIndicator";
import MicButton from "@/components/MicButton";
import SendButton from "@/components/SendButton";
import InsightIQ from "@/components/InsightIQ";

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

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        try {
            const response = await fetch(`${API_BASE_URL}/api/generate-code/index/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userMessage: userMessage.text}),
            });

            const data = await response.json();

            if (response.ok) {
                const assistantReply = data.generated_code;
                setMessages((prev) => [
                    ...prev,
                    {id: Date.now() + 1, from: "assistant", text: assistantReply},
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        from: "assistant",
                        text: data.error || "Sorry, I couldn't understand that.",
                    },
                ]);
            }
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {id: Date.now() + 1, from: "assistant", text: "Error fetching response."},
            ]);
        }

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

    function autoResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }

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
                        className="w-full rounded-t-xl px-4 py-3 text-sm bg-transparent font-bold-medium focus:outline-none resize-none placeholder-gray-500 shadow-none max-h-300 overflow-y-auto scrollbar-hide"
                        placeholder="What's on your mind?"
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            autoResize(e.target);
                        }}
                        onKeyDown={handleKeyDown}
                    />

                    {/* Bottom row with Tools text and icons */}
                    <div className="flex items-center justify-between rounded-b-xl px-4 py-2">
                        <div className="text-gray-600 font-sm select-none">
                            <InsightIQ
                                type="button"
                                ariaLabel="Insight IQ feature"
                            />

                        </div>

                        <div className="flex items-center gap-4">
                            <MicButton
                                type="button"
                                ariaLabel="Start microphone"
                            />
                            <SendButton
                                sendMessage={sendMessage}
                                disabled={!input.trim()}
                                type="button"
                                ariaLabel="Send Message"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
