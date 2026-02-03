// src/App.js
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import PropertyDetails from "../src/Pages/ExploreProperties/PropertyDetails/PropertyDetails";
import ExploreProperties from "../src/Pages/ExploreProperties/ExploreProperties";
import ExploreBrokers from "../src/Pages/ExploreBrokers/Component/ExploreBrokers";
import ContactBroker from "../src/Pages/ExploreBrokers/Pages/ContactBroker/ContactBroker";
import ListProperty from "./Pages/ListProperty/ListProperty";
import Enquiry from "./Pages/Enquiry";
import NotFound from "./Pages/ErrorPages/NotFound";
import ServerError from "./Pages/ErrorPages/ServerError";
import { useState, useEffect } from "react"; 
import Offline from "./Pages/ErrorPages/Offline";
import Calculator from "./Pages/Calculator/Calculator";
import ContactUs from "./Component/Home/Navbar/Pages/ContactUs/ContactUs";
import PropertyComparison from "./Pages/PropertyComparison/PropertyComparison";
import BrokerRegistration from "./Component/Home/auth/BrokerRegistration";
import Investor from "./Component/Home/Navbar/Pages/Dashboard/Investor/Investor";
import Broker from "./Component/Home/Navbar/Pages/Dashboard/Broker/Broker";
import Owner from "./Component/Home/Navbar/Pages/Dashboard/Owner/Owner";

function App() {
  // State to track online/offline status
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status
    const handleOnline = () => {
      setIsOnline(true);
      console.log("Connection restored");
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("Connection lost");
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // If offline, show Offline page for all routes
  if (!isOnline) {
    return (
      <Routes>
        <Route path="*" element={<Offline />} />
      </Routes>
    );
  }

  // If online, show normal routes including ServerError route
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='explore-properties' element={<ExploreProperties />} />
        <Route path='propertyDetails/:id' element={<PropertyDetails />} />
        <Route path='explore-brokers' element={<ExploreBrokers />} />
        <Route path='contact-brokers/:id' element={<ContactBroker />} />
        <Route path='list-property' element={<ListProperty />} />
        <Route path='enquiry/:id' element={<Enquiry />} />
        <Route path='calculators' element={<Calculator />} />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='compare/:id' element={<PropertyComparison></PropertyComparison> } />
        <Route path='broker-registration' element={<BrokerRegistration></BrokerRegistration> } />
        <Route path='investor-dashboard' element={<Investor></Investor> } />
        <Route path='broker-dashboard' element={<Broker></Broker> } />
        <Route path='owner-dashboard' element={<Owner></Owner> } />

        {/* Server Error Page Route */}
        <Route path='server-error' element={<ServerError />} />
        
        {/* 404 Route - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;