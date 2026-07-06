interface Props {
    role: "user" | "assistant";
    content: string;
}

export default function ChatMessage({
    role,
    content,
}: Props) {

    const isUser = role === "user";

    return (

        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`
                    max-w-3xl
                    rounded-2xl
                    px-5
                    py-4
                    ${
                        isUser
                            ? "bg-blue-600 text-white"
                            : "bg-white border shadow-sm"
                    }
                `}
            >

                <div className="mb-2 text-xs font-semibold opacity-70">

                    {isUser ? "👤 You" : "🤖 Assistant"}

                </div>

                <div className="whitespace-pre-wrap">

                    {content}

                </div>

            </div>

        </div>

    );

}