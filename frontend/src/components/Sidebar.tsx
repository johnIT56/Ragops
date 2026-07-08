import {
    FiBarChart2,
    FiMessageSquare,
    FiFileText,
    FiCpu,
    FiPlayCircle,
    FiRepeat,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const items = [
    {
        name: "Dashboard",
        path: "/",
        icon: FiBarChart2,
    },
    {
        name: "Documents",
        path: "/documents",
        icon: FiFileText,
    },
    {
        name: "Chat",
        path: "/chat",
        icon: FiMessageSquare,
    },
    {
        name: "Experiments",
        path: "/experiments",
        icon: FiCpu,
    },
    {
        name: "Runs",
        path: "/runs",
        icon: FiPlayCircle,
    },
    {
        name: "Compare",
        path: "/compare",
        icon: FiRepeat,
    },
];

export default function Sidebar() {

    return (

        <aside className="w-64 bg-slate-900 text-white flex flex-col">

            <div className="p-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    🚀 RAGOps
                </h1>

            </div>

            <nav className="flex-1 p-4">

                {items.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition ${
                                    isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                }`
                            }
                        >

                            <Icon size={20} />

                            {item.name}

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );

}