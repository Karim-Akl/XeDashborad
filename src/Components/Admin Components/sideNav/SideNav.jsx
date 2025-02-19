import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./sideNav.css";
const SideNav = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <nav
        className={isSidebarOpen ? "sidebar" : "hidden sidebar"}
        id="sidebar"
      >
        <ul className="nav">
          <li className="nav-item nav-profile mt-2">
            <NavLink className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
              {/* <Link className="navbar-brand brand-logo" to="#"><img src={logo} alt="logo" /></Link> */}
              {/* <Link className="navbar-brand brand-logo-mini" to="#"><img src={logo} alt="logo" /></Link> */}
              <Link className="navbar-brand brand-logo" to="#">
                <img
                  src="/assets/images/logo.059c021ca4a59b861ff3.webp"
                  alt="logo"
                  style={{
                    width: "100%",
                    margin: "10px auto",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </Link>
            </NavLink>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#countries"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <div>
                <i
                  class="fa fa-globe"
                  aria-hidden="true"
                  onClick={() => navigate("/admin/all-countries")}
                ></i>
                <span className="menu-title" style={{ fontWeight: "700" }}>
                  الخدمات
                </span>
              </div>
              <i className="menu-arrow" style={{ marginRight: "75px" }} />
            </Link>
            <div className="collapse" id="countries">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/all-countries">
                    كل الخدمات
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#services"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <div>
                <i
                  class="fa fa-cogs"
                  aria-hidden="true"
                  onClick={() => navigate("/admin/services")}
                ></i>
                <span className="menu-title" style={{ fontWeight: "700" }}>
                  CV
                </span>
              </div>
              <i className="menu-arrow" style={{ marginRight: "75px" }} />
            </Link>
            <div className="collapse" id="services">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/services">
                    كل CV
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-service">
                    اضافة CV
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#bookings"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <div>
                <i
                  class="fa fa-book"
                  aria-hidden="true"
                  onClick={() => navigate("/admin/bookings")}
                ></i>
                <span className="menu-title" style={{ fontWeight: "700" }}>
                  الحجوزات
                </span>
              </div>
              <i className="menu-arrow" style={{ marginRight: "75px" }} />
            </Link>
            <div className="collapse" id="bookings">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/bookings">
                    كل الحجوزات
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-booking">
                    اضافة حجز
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link justify-content-between"
              data-bs-toggle="collapse"
              to="#faq"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <div>
                <i
                  class="fa fa-book"
                  aria-hidden="true"
                  onClick={() => navigate("/admin/faqs")}
                ></i>
                <span className="menu-title" style={{ fontWeight: "700" }}>
                  الاسئلة الشائعة
                </span>
              </div>
              <i className="menu-arrow" style={{ marginRight: "75px" }} />
            </Link>
            <div className="collapse" id="faq">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/faqs">
                    كل الاسئلة
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/add-faq">
                    اضافة سؤال
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link to={"/admin/transactions"} className="nav-link">
              <i class="fa fa-money" aria-hidden="true"></i>
              <span className="menu-title" style={{ fontWeight: "700" }}>
                المعاملات
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/admin/messages"} className="nav-link">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span className="menu-title" style={{ fontWeight: "700" }}>
                الرسائل
              </span>
            </Link>
          </li>
          <li className="nav-item" onClick={() => handleLogout()}>
            <Link className="nav-link" to="/login">
              <i className="fa fa-sign-out" aria-hidden="true" />
              <span className="menu-title" style={{ fontWeight: "700" }}>
                تسجيل الخروج
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
