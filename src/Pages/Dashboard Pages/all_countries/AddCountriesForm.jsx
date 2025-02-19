import React, { useState } from "react";

const AddCountriesForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    image: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value, // Handle file upload and text input
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "الاسم مطلوب";
    }
    if (!formData.image && !initialData) {
      newErrors.image = "الصورة مطلوبة";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Call the parent handler if validation passes
      onSubmit(formData);

      // Reset the form after submission
      setFormData({
        name: "",
        image: "",
      });
      setError({});
    }
  };
  return (
    <form
      className="forms-sample"
      onSubmit={handleSubmit}
      enctype="multipart/form-data"
    >
      <div className="form-group col-sm-12 ">
        <div className="row">
          <div className="col-sm-6 my-2">
            <label htmlFor="exampleInputName1">الاسم</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              placeholder="ادخل الاسم"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            {error.name && <p className="text-danger">{error.name}</p>}
          </div>

          <div className="col-sm-6 my-2">
            <label htmlFor="exampleInputImage1">الصورة</label>
            <input
              type="file"
              className="form-control"
              id="exampleInputImage1"
              placeholder="اختر صورة"
              onChange={handleChange}
              name="image"
              accept="image/*"
            />
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt={formData.name}
                className="img-fluid mt-2"
                style={{ height: "100px", width: "100px" }}
              />
            )}
            {initialData && initialData.image && !formData.image && (
              <img
                src={`https://xealkhalej-backend.alwajez.com/${initialData.image}`}
                alt={initialData.name}
                className="img-fluid mt-2"
                style={{ height: "100px", width: "100px" }}
              />
            )}

            {error.image && <p className="text-danger">{error.image}</p>}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button type="submit" className="btn btn-gradient-primary me-2">
          حفظ
        </button>
      </div>
    </form>
  );
};

export default AddCountriesForm;
