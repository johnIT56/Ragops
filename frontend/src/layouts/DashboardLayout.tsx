import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: Props) {

    return (

        <div className="flex h-screen bg-slate-100">

            <Sidebar />

            <main className="flex-1 overflow-auto p-10">

                {children}

            </main>

        </div>

    );

}