import { Route, Routes } from "react-router-dom";
import Registeration from "./components/pages/Registeration";
import Dashboard from "./components/pages/Dashboard";
import Chapters from "./components/Chapters";
import ChapterManager from "./components/ChapterManagers";
import Request from "./components/Request";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Registeration />} />

      {/* Dashboard with nested routes */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="chapters" element={<Chapters />} />
        <Route path="chapterManager" element={<ChapterManager />} />
        <Route path="request" element={<Request />} />
      </Route>
    </Routes>
  );
}

export default App;
