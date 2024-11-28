import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import { Auth } from "./auth/Auth";
import PageNotFound from "./components/PageNotFound";


import SaDashboard from "./components/SuperAdmin/SaDashboard";
import SaDashboardDetails from "./components/SuperAdmin/SaDashboardDetails";
import SaAdminsTable from "./components/SuperAdmin/SaAdminsTable";
import SaChapterManagers from "./components/SuperAdmin/SaChapterManagers";
import SaChapterMembers from "./components/SuperAdmin/SaChapterMembers";
import SaChapters from "./components/SuperAdmin/SaChapters";
import SaMembers from "./components/SuperAdmin/SaMembers";
import SaProfile from "./components/SuperAdmin/SaProfile";
import SaRequests from "./components/SuperAdmin/SaRequests";
import SaSpousePartners from "./components/SuperAdmin/SaSpousePartners";

import CpDashboard from "./components/ChapterManager/CpDashboard"
import CpDashboardDetails from "./components/ChapterManager/CpDashboardDetails"
import CpChapters from "./components/ChapterManager/CpChapters"
import CpChapterUsers from "./components/ChapterManager/CpChapterUsers"
import CpProfile from "./components/ChapterManager/CpProfile"



function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route exact path="*" element={<PageNotFound />} />

      {/* Dashboard for admin with nested routes */}
      <Route path="/sp/dashboard" element={<SaDashboard />}>
        <Route path="sahome" element={<SaDashboardDetails />} />
        <Route path="saadminstable" element={<SaAdminsTable />} />
        <Route path="sachaptermanagers" element={<SaChapterManagers />} />
        <Route path="sachaptermembers/:chapter_id" element={<SaChapterMembers />} />
        <Route path="sachapters" element={<SaChapters />} />
        <Route path="samembers" element={<SaMembers />} />
        <Route path="saprofile" element={<SaProfile />} />
        <Route path="sarequests" element={<SaRequests />} />
        <Route path="saspousepartners" element={<SaSpousePartners />} />
      </Route>


      <Route path="/cp/dashboard" element={<CpDashboard />}>
        <Route path="cphome" element={<CpDashboardDetails />} />
        <Route path="cpchapters" element={<CpChapters />} />
        <Route path="cpchapterusers/:chapter_id" element={<CpChapterUsers />} />
        <Route path="cpprofile" element={<CpProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
