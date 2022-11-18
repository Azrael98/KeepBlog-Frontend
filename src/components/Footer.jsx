import React from "react";
import Logo from "../img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t bg-white pb-12">
      <div className="w-full container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
          <Link to="" className="uppercase px-3">
            About Us
          </Link>
          <Link to="" className="uppercase px-3">
            Privacy Policy
          </Link>
          <Link to="" className="uppercase px-3">
            Terms & Conditions
          </Link>
          <Link to="" className="uppercase px-3">
            Contact Us
          </Link>
        </div>
        <div className="uppercase pb-6">&copy; keepblog.com</div>
      </div>
    </footer>
  );
}

export default Footer;
