// import React from "react";
// import {
//   MDBFooter,
//   MDBContainer,
//   MDBCol,
//   MDBRow,
//   MDBBtn,
// } from "mdb-react-ui-kit";

// export default function Footer() {
//   return (
//     <MDBFooter
//       className="text-center text-white"
//       style={{ backgroundColor: "#872746" }}
//     >
//       <MDBContainer className="p-4 pb-0 justify-content-center">
//         <section className="">
//           <p className="d-flex justify-content-center align-items-center">
//             <div className="footer-links">
//               <a href="/about">About Us &nbsp;|</a>
//               <a href="/contact">&nbsp;Contact Us&nbsp;|</a>
//               <a href="/privacy-policy">&nbsp;Privacy Policy</a>
//             </div>
//           </p>
//         </section>
//       </MDBContainer>

//       <div
//         className="text-center p-3"
//         style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
//       >
//         © 2020 Copyright:
//         <a className="text-white" href="https://mdbootstrap.com/">
//           MDBootstrap.com
//         </a>
//       </div>
//     </MDBFooter>
//   );
// }

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Axis Job Portal. All rights
            reserved.
          </p>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="/privacy-policy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
