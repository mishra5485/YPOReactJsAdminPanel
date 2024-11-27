import { Route, Routes } from "react-router-dom";
import Registeration from "./components/admin/pages/Registeration";
import Dashboard from "./components/admin/pages/Dashboard";
import AdminChapters from "./components/admin/admin chapters/AdminChapters";
import ChapterManager from "./components/admin/ChapterManagers";
import Request from "./components/admin/Request";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Registeration />} />

      {/* Dashboard for admin with nested routes */}
      <Route path="/superadmin/dashboard" element={<Dashboard />}>
        <Route path="chapters" element={<AdminChapters />} />
        <Route path="chapterManager" element={<ChapterManager />} />
        <Route path="request" element={<Request />} />
      </Route>
    </Routes>
  );
}

export default App;
