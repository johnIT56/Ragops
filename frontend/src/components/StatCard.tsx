interface Props {

    title: string;

    value: number;

}

export default function StatCard({

    title,

    value,

}: Props) {

    return (

        <div className="rounded-xl bg-white p-6 shadow-sm border">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-4xl font-bold mt-3">

                {value}

            </h2>

        </div>

    );

}