import React from "react";
import bgimage from "../../../../../assets/avatar.png";
import TextArea from "../../../../../components/Input/TextArea";
import { useState } from "react";
import Button from "../../../../../components/Button";
const DonorProfile = () => {
  const [data, setData] = useState({
    id: "user_id",
    message: "",
  });
  // useEffect(() => {
  //   setFormErrors(supportCreateNewValidation(data));
  // }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.keys(formErrors).length > 0) {
    //   Notification("All conditions and field are required", "error");
    // } else {
    //   await AddNewUpdate(data);
    // }
    console.log(data);
  };
  const isLoading = false;
  return (
    <>
      <div className="life_care_project_donor_profile">
        <div className="life_care_project_donor_profile_left">
          <div className="profile_image">
            <img src={bgimage} alt="" />
            <span className="blood_group">A+</span>
          </div>
          <div className="profile_heading">
            <h3>Mr.Jamal</h3>
            <p>Donor & doctor</p>
          </div>
          <div className="profile_title">
            <p>
              Blood group: <span className="blood">A+</span>
            </p>
            <p>
              Right now{" "}
              <span className={true ? "eligible" : "Not_eligible"}>
                Eligible
              </span>{" "}
              for donation
            </p>
          </div>
          <div className="profile_details">
            <h4>Contact</h4>
            <p>
              Email: <span>mr.jamal@gmail.com</span>
            </p>
            <p>
              Phone: <span>01949016709</span>
            </p>
            <p>
              Last donation: <span>04/11/2020</span>
            </p>
          </div>
        </div>
        <div className="life_care_project_donor_profile_right">
          <div className="profile_send_message">
            <form onSubmit={handleSubmit}>
              <TextArea
                label="Your Message"
                name="message"
                cols="30"
                rows="10"
                onChange={(e) => setData({ ...data, message: e.target.value })}
                value={data.message}
                className="question_field"
                placeholder="Write your message..."
                isRequired={true}
              ></TextArea>
              <Button type="submit" className="submit_btn">
                {isLoading ? "Loading..." : "submit"}
              </Button>
            </form>
          </div>
          <div className="last_donor_info">
            <h1>donor title</h1>
            <div className="last_donor_list">
              <span>
                <img src="" alt="" />
                <p>name</p>
              </span>
              <span>
                <img src="" alt="" />
                <p>name</p>
              </span>
              <span>
                <img src="" alt="" />
                <p>name</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorProfile;
