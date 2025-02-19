import React, { useEffect, useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import img1 from "../../../images/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import AddCountriesForm from "./AddCountriesForm";
import Swal from "sweetalert2";
import "./countries.css";
import {
  useCreateCountryMutation,
  useDeleteCountryMutation,
  useGetCountriesQuery,
  useUpdateCountryMutation,
} from "../../../api/countriesSlice";

const AllCountries = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const { data: countries, error, isLoading, refetch } = useGetCountriesQuery();

  const [createCountry] = useCreateCountryMutation();
  const [updateCountry] = useUpdateCountryMutation();
  const [deleteCountry] = useDeleteCountryMutation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleFormSubmit = async (formData) => {
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    if (formData.image && formData.image.size > 0) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editingCountry) {
        // Update country
        await updateCountry({
          id: editingCountry.id,
          updatedCountry: formDataToSend,
        }).unwrap();
        refetch();
        setShowPopup(false); // Reset editing state
      } else {
        // Create a new country
        try {
          await createCountry(formDataToSend).unwrap();
        } catch (error) {
          console.log(error);
        }
      }
      setShowPopup(false); // Close the form
      refetch(); // Refresh the data
    } catch (err) {
      console.error("Failed to save country:", err);
    }
  };

  const handleEditCountry = (country) => {
    setEditingCountry(country); // Set country to be edited
    setShowPopup(true);
  };

  const handleDeleteCountry = async (countryId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "الغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCountry(countryId).unwrap();
          Swal.fire("تم الحذف!", "تم حذف الدولة بنجاح.", "success");
          refetch(); // Refresh the countries list after deletion
        } catch (err) {
          console.error("Failed to delete country:", err);
          Swal.fire("خطأ!", "حدث خطأ أثناء محاولة حذف الدولة.", "error");
        }
      }
    });
  };
  useEffect(() => {
    document.body.classList.remove("sidebar-icon-only"); // Close sidebar on page change
  }, []);
  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav isSidebarOpen={isSidebarOpen} />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="كل الخدمات" icon="fa fa-globe" />
          </div>
          <div className="add-country">
            <button
              className="btn add-btn btn-gradient-primary"
              onClick={() => setShowPopup(true)}
            >
              اضافة خدمه جديد{"  "}
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-content">
                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  &times;
                </button>
                <h4 className="card-title mb-4">
                  {editingCountry ? "تعديل الدولة" : "نموذج اضافة خدمه جديد"}
                </h4>
                <AddCountriesForm
                  onSubmit={handleFormSubmit}
                  initialData={editingCountry} // Pass country data if editing
                  isEditMode={editingCountry !== null}
                />
              </div>
            </div>
          )}
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                    كل الخدمات
                    <i
                      className="fa fa-angle-double-right"
                      aria-hidden="true"
                    ></i>
                    <hr />
                  </h3>
                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error ? (
                      <div>Error loading countries</div> // Display error message if there is an error
                    ) : (
                      <table className="table text-center table-hover">
                        <thead className="table-dark">
                          <tr style={{ fontWeight: "bold" }}>
                            <th>#</th>
                            <th>الاسم</th>
                            <th>الصورة</th>
                            <th>اجراء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {countries.map((country, index) => (
                            <tr key={country.id}>
                              <td>{index + 1}</td>
                              <td>{country.name}</td>
                              <td>
                                <img
                                  src={`https://xealkhalej-backend.alwajez.com/${country.image}`}
                                  alt="country"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                  }}
                                />
                              </td>
                              <td>
                                <button
                                  className="btn text-success"
                                  title="تعديل"
                                  onClick={() => handleEditCountry(country)}
                                >
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                <button
                                  className="btn text-danger"
                                  onClick={() =>
                                    handleDeleteCountry(country.id)
                                  }
                                  title="حذف"
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCountries;
