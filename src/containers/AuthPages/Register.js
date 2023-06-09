import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import CustomLink from "../../components/Link";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Footer from "../FrontPage/components/Footer";
import Header from "../FrontPage/components/Header";
import { Validate } from "../../components/Validation/vaildate";
import {
  useAddUserMutation,
  useGetValidateEmailQuery,
} from "../../Services/userApi";
import { Notification } from "../../components/ToastNotification";
import AuthCardLayout from "./AuthCardLayout";
import { getLocalStorage, savedLocalStorage } from "../../utils/function/localStorage";
const Register = () => {
  const [OTPup, setOTPup] = useState(false);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [eerros, setEerror] = useState("");
  const [formErrors, setFormErrors] = useState({}); // form error
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // email validate
  const { data: emailData, error: emailError } = useGetValidateEmailQuery(
    user.email
  );
  useEffect(() => {
    if (emailData?.message) {
      setEerror(emailData?.message);
    }
    if (emailError?.data?.message) {
      setEerror(emailError?.data?.message);
    }
  }, [emailError?.data?.message, emailData?.message]);

  const [addUser, { data, error, isLoading }] = useAddUserMutation();

  useEffect(() => {
    if (data?.message) {
      // navigate("/login");
      Notification(data?.message, "success");
      navigate("/dashboard");
      savedLocalStorage("testingToken", data?.token);
    } else {
      Notification(error?.data?.message, "error");
    }
  }, [error, data, navigate]);

  // error
  useEffect(() => {
    setFormErrors(Validate(user));
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0) {
      Notification(
        formErrors?.name || formErrors?.email || formErrors?.password,
        "error"
      );
    } else {
      const dataUser = {
        ...user,
      };
      console.log(dataUser);
      await addUser(dataUser);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  // redirect and store JWT token
  const token = getLocalStorage("testingToken");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Header />
      <div className="life_care_project_dashboard_register_page_wrapper">
        <AuthCardLayout
          style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
          className="life_care_project_dashboard_register_card"
        >
          <div className="life_care_project_section_title">
            <h2>Register</h2>
          </div>
          <div className="hr_border"></div>
          <div className="life_care_project_dashboard_register_content">
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="name_input input_field"
                  inputGroupClass="left"
                  isRequired={true}
                  error={formErrors.name}
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="email_input input_field"
                  inputGroupClass="right"
                  isRequired={true}
                />
                {!formErrors.email?.includes("required") && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    {formErrors.email}
                  </p>
                )}
                {!formErrors.email && !eerros.includes("Not Found") && (
                  <p
                    style={{
                      color: eerros.includes("Available") ? "green" : "red",
                      fontSize: "13px",
                    }}
                  >
                    {eerros}
                  </p>
                )}
              </div>
              <div className="form_group">
                <Input
                  label="Password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="input_field"
                  inputGroupClass="left"
                  isRequired={true}
                  error={formErrors.password}
                />
                <Input
                  label="Confirm Password"
                  type={`${showPassword ? "text" : "password"}`}
                  name="confirm_password"
                  placeholder="Enter your confirm password"
                  onChange={handleChange}
                  className="input_field"
                  inputGroupClass="right"
                  isRequired={true}
                  error={formErrors.confirm_password}
                />
              </div>
              <div
                className="form-check form-check-label show_password form_group"
                style={{
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Input
                  type="checkbox"
                  className="form-check-input form-check-label"
                  value="showpassword"
                  id="showpassword"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showpassword" className="form-check-label">
                  &nbsp;Show Password
                </label>
              </div>
              <div
                className="form-check form-check-label show_password form_group"
                style={{
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* <Input
                  type="checkbox"
                  className="form-check-input form-check-label"
                  value="termscondition"
                  id="termscondition"
                  defaultChecked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />
                <label htmlFor="termscondition" className="form-check-label">
                  &nbsp;I agree to{" "}
                  <CustomLink
                    to="/termsconditions"
                    style={{ color: "#4885ed" }}
                  >
                    Terms & Conditions
                  </CustomLink>
                </label> */}
              </div>

              <Button type="submit" className="submit_btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Register"}
              </Button>
              <div className="go_to_login">
                <p>
                  already have account?&nbsp;
                  <CustomLink href="/login" className="log_page_nav_link">
                    Login
                  </CustomLink>{" "}
                </p>
              </div>
            </form>
          </div>
        </AuthCardLayout>
      </div>
      <Footer />
    </>
  );
};

export default Register;
