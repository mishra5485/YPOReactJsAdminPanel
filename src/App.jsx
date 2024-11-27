import { Navigate, Route, Routes } from "react-router-dom";

import Registeration from "./components/Registeration";
import ValidateCoupon from "./components/ValidateCoupon";
import SpinWheel from "./components/SpinWheel";
import PrizeDetails from "./components/PrizeDetails";
import Userdata from "./components/Userdata";
import ThankYou from "./components/ThankYou";
import Profile from "./components/Profile";





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registeration />} />
        <Route path="/coupon" element={<ValidateCoupon />} />
        <Route path="/spinwheel" element={<SpinWheel />} />
        <Route path="/prizedetails" element={<PrizeDetails />} />
        <Route path="/userdetails" element={<Userdata />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;