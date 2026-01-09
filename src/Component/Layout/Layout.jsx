import React from 'react';
import Navbar from '../Home/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Home/Footer';

const Layout = () => {
    const location = useLocation();
    const isEnquiryPage = location.pathname.includes('/enquiry/');
    
    return (
        <div>
            {!isEnquiryPage && <Navbar />}
            <Outlet />
            {!isEnquiryPage && <Footer />}
        </div>
    );
};

export default Layout;