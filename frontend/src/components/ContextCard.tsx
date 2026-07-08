interface Props {
    content: string;
}

export default function ContextCard({
    content,
}: Props) {

    return (

        <div
            className="
                ml-10
                rounded-xl
                border
                bg-slate-50
                p-4
            "
        >

            <div className="mb-2 font-semibold">

                📚 Retrieved Context

            </div>

            <div
                className="
                    whitespace-pre-wrap
                    text-sm
                    text-gray-700
                "
            >

                {content}

            </div>

        </div>

    );

}