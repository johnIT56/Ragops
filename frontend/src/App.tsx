import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import ChatPage from "./pages/Chat/ChatPage";
import DocumentsPage from "./pages/Documents/DocumentsPage";
import ExperimentsPage from "./pages/Experiments/ExperimentsPage";
import RunsPage from "./pages/Runs/RunsPage";
import ComparePage from "./pages/Compare/ComparePage";
import RunDetailsPage from "./pages/Runs/RunDetailsPage";
import CompareRunsPage from "./pages/CompareRuns/CompareRunsPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/experiments" element={<ExperimentsPage />} />
                <Route path="/runs" element={<RunsPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/experiments/:experimentId/runs" element={<RunsPage />} />
                <Route path="/runs/:runId" element={<RunDetailsPage />} />
                <Route path="/experiments/:experimentId/compare" element={<CompareRunsPage />} />
            </Routes>
        </BrowserRouter>
    );
}