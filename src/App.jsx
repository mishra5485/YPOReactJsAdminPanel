import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import { SuperAdminAuth,ChapterManagerAuth } from "./auth/Auth";
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
      <Route path="/sp/dashboard" element={<SuperAdminAuth><SaDashboard /></SuperAdminAuth>}>
        <Route path="sahome" element={<SuperAdminAuth><SaDashboardDetails /></SuperAdminAuth>} />
        <Route path="saadminstable" element={<SuperAdminAuth><SaAdminsTable /></SuperAdminAuth>} />
        <Route path="sachaptermanagers" element={<SuperAdminAuth><SaChapterManagers /></SuperAdminAuth>} />
        <Route path="sachaptermembers/:chapter_id" element={<SuperAdminAuth><SaChapterMembers /></SuperAdminAuth>} />
        <Route path="sachapters" element={<SuperAdminAuth><SaChapters /></SuperAdminAuth>} />
        <Route path="samembers" element={<SuperAdminAuth><SaMembers /></SuperAdminAuth>} />
        <Route path="saprofile" element={<SuperAdminAuth><SaProfile /></SuperAdminAuth>} />
        <Route path="sarequests" element={<SuperAdminAuth><SaRequests /></SuperAdminAuth>} />
        <Route path="saspousepartners" element={<SuperAdminAuth><SaSpousePartners /></SuperAdminAuth>} />
      </Route>


      <Route path="/cp/dashboard" element={<ChapterManagerAuth><CpDashboard /></ChapterManagerAuth>}>
        <Route path="cphome" element={<ChapterManagerAuth><CpDashboardDetails /></ChapterManagerAuth>} />
        <Route path="cpchapters" element={<ChapterManagerAuth><CpChapters /></ChapterManagerAuth>} />
        <Route path="cpchapterusers/:chapter_id" element={<ChapterManagerAuth><CpChapterUsers /></ChapterManagerAuth>} />
        <Route path="cpprofile" element={<ChapterManagerAuth><CpProfile /></ChapterManagerAuth>} />
      </Route>
    </Routes>
  );
}

export default App;
