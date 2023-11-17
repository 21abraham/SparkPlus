import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import NewYork from "./pages/NewYork";
import SanFrancisco from "./pages/SanFrancisco";
import CinqueTerre from "./pages/CinqueTerre";
import Pisa from "./pages/Pisa";
import Paris from "./pages/Paris";
import ShowRoom from "./users/ShowRoom";
import Status from "./users/Status";
import HotelDetails from "./pages/HotelDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import AddHost from "./users/AddHost";
import AddRoom from "./users/AddRoom";
import AddHotel from "./users/AddHotel";
import EditUser from "./users/EditUser";
import EditHotel from "./users/EditHotel";
import EditRoom from "./users/EditRoom";
import ViewUser from "./users/ViewUser";
import AllBooking from "./users/AllBooking";
import Login from "./Login/Login";
import Forgot from "./Login/Forgot";
import OTP from "./Login/OTP";
import Changepwd from "./Login/Changepwd";
import Welcome_admin from "./welcome/Welcome_admin";
import Welcome_cust from "./welcome/Welcome_cust";
import Welcome_host from "./welcome/Welcome_host";
import { toast, ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
          <Router>
        {/*<Navbar />*/}
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/allbooking/:id" element={<AllBooking />} />
        <Route exact path="/status/:bookId/:hostId" element={<Status />} />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route exact path="/newyork/:id" element={<NewYork />} />
        <Route exact path="/Pisa/:id" element={<Pisa />} />
        <Route exact path="/CinqueTerre/:id" element={<CinqueTerre />} />
        <Route exact path="/SanFrancisco/:id" element={<SanFrancisco />} />
        <Route exact path="/otp/:id" element={<OTP />} />
        <Route exact path="/changepwd/:id" element={<Changepwd />} />
        <Route exact path="/paris/:id" element={<Paris />} />
        <Route exact path="/adduser" element={<AddUser />} />
        <Route exact path="/addhost/:id" element={<AddHost />} />
        <Route exact path="/addroom/:id" element={<AddRoom />} />
        <Route exact path="/addhotel/:id" element={<AddHotel />} />
        <Route exact path="/edituser/:id" element={<EditUser />} />
        <Route exact path="/editroom/:id/:hotelId" element={<EditRoom />} />
        <Route exact path="/viewuser/:id" element={<ViewUser />} />
        <Route path="/showroom/:hotelId" element={<ShowRoom />} />
        <Route path="/edithotel/:hotelId/:id" element={<EditHotel />} />
        <Route path="/hotels/:roomId/:id" element={<HotelDetails />} />
        <Route exact path="/welcome_admin/:id" element={<Welcome_admin />} />
        <Route exact path="/welcome_cust/:id" element={<Welcome_cust />} />
        <Route exact path="/welcome_host/:id" element={<Welcome_host />} />
        </Routes>
              {/*<Footer />*/}
              
          </Router>
          <ToastContainer />
    </div>
  );
}

export default App;
