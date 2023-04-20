import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DonorProfile from "./Components/DonorProfile";

const BloodDonorDetails = () => {
  let { id } = useParams();
  return (
    <>
      <Header hidePackageRoute />
      <DonorProfile />
      <Footer />
    </>
  );
};

export default BloodDonorDetails;
