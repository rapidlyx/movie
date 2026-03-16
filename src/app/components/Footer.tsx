import { TbMovie } from "react-icons/tb";
import { PiPhoneThin } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
export const Footer = () => {
  return (
    <div
      id="footer-content"
      className="w-full h-70 py-10 flex gap-12 bg-indigo-700 items-center justify-center mt-10 max-sm:w-auto"
    >
      <div
        id="footer-container"
        className="w-full h-50 max-w-7xl flex gap-30 max-sm:flex-col max-sm:gap-7 max-sm:px-5 max-sm:justify-center"
      >
        <div id="info-section" className="w-61.75 h-50 flex gap-10 max-sm:w-auto">
          <div id="logo-and-right" className="w-full h-13 flex flex-col gap-3">
            <div id="logo" className="flex items-center ">
              <TbMovie
                style={{ color: "white", width: "25px", height: "25px" }}
              />
              <p className="text-white font-semibold italic">Movie Z</p>
            </div>
            <div id="date">
              <p className="text-white text-sm font-normal">
                © 2024 Movie Z. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
        <div
          id="contact-and-social"
          className="w-auto h-50 flex gap-24 justify-end max-sm:justify-start max-sm:gap-12"
        >
          <div
            id="contact-section"
            className="text-white flex flex-col gap-3 text-sm"
          >
            <p>Contact Information</p>
            <div id="contact-details" className="flex flex-col gap-6">
              <div id="email-container" className="flex items-center gap-3 ">
                <CiMail style={{ width: "16px", height: "16px" }} />
                <div id="email-text">
                  <p>Email:</p>
                  <p>test@gmail.com</p>
                </div>
              </div>
              <div id="phone-container" className="flex items-center gap-3 ">
                <PiPhoneThin style={{ width: "16px", height: "16px" }} />
                <div id="phone-text">
                  <p>Phone:</p>
                  <p>+976 9911-9911</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="social-media-section"
            className="text-white flex flex-col gap-3 text-sm w-auto "
          >
            <p>Follow us</p>
            <div className="flex gap-3 font-medium max-sm:flex-col ">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
