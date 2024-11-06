// import React from 'react'
import partners1 from "../assets/shoopee.png";
import partners2 from "../assets/bukalapak.png";
import partners3 from "../assets/lazada.png";
import partners4 from "../assets/orami.png";
import partners5 from "../assets/tokopedia.png";
import partners6 from "../assets/shopify.png";

const Partners = () => {
  return (
    <div className="container text-center my-5">
      <div className="row justify-content-center mx-auto gy-3 g-5">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={partners1} alt="" />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={partners2} alt="" />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={partners3} alt="" />
        </div>
      {/* </div>
      <div className="row justify-content-center mx-auto mt-5"> */}
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={partners4} alt="" />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={partners5} alt="" />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src={partners6} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Partners;
