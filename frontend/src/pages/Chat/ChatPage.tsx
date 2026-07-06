import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { askQuestion } from "../../api/chat";

import ChatMessage from "../../components/ChatMessage";
import ContextCard from "../../components/ContextCard";

interface Message {
    role: "user" | "assistant";
    content: string;
    contexts?: string[];
}

export default function ChatPage() {

    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] =
        useState<Message[]>([]);

    const handleAsk = async () => {

        if (!question.trim())
            return;

        const userQuestion = question;

        setQuestion("");

        setLoading(true);

        try {

            const response =
                await askQuestion(userQuestion);

            setMessages((prev) => [

                ...prev,

                {
                    role: "user",
                    content: userQuestion,
                },

                {
                    role: "assistant",
                    content: response.answer,
                    contexts: response.contexts,
                },

            ]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">
                Chat
            </h1>

            <div
    className="
        space-y-8
        mb-8
        min-h-[500px]
    "
>

                {messages.map((message, index) => (

                    <div
                        key={index}
                        className="space-y-3"
                    >

                        <ChatMessage
                            role={message.role}
                            content={message.content}
                        />

                        {message.contexts?.map(
                            (
                                context,
                                contextIndex,
                            ) => (

                                <ContextCard
                                    key={contextIndex}
                                    content={context}
                                />

                            )
                        )}

                    </div>

                ))}

                {loading && (

                    <ChatMessage
                        role="assistant"
                        content="Thinking…"
                    />

                )}

            </div>

            <div className="border-t pt-6">

                <textarea
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    onKeyDown={(e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            handleAsk();

        }

    }}
    rows={4}
    placeholder="Ask anything about your documents..."
    className="
        w-full
        rounded-xl
        border
        p-4
        mb-4
    "
/>

                <button
                    onClick={handleAsk}
                    disabled={loading}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-6
                        py-3
                        text-white
                        hover:bg-blue-700
                        disabled:bg-gray-400
                    "
                >

                    {loading
                        ? "Thinking..."
                        : "Send"}

                </button>

            </div>

        </DashboardLayout>

    );

}