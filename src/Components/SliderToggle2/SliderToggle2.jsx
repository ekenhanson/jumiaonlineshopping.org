
// import React from "react";
import PropTypes from "prop-types";
import "./SliderToggle2.css";
import { useTranslation } from 'react-i18next';


const SliderToggle = ({ selectedMethod, setSelectedMethod }) => {

  const { t } = useTranslation();

  return (
    <div className="slider-toggle">
      {/* <button
        className={`toggle-button rounded-start-5 ${selectedMethod === "wallet" ? "active" : ""}`}
        onClick={() => setSelectedMethod("wallet")}
      >
        {t('wallet_payment')}
      </button> */}
      <button
        className={`toggle-button rounded-end-5 ${selectedMethod === "bank-payment" ? "active" : ""}`}
        onClick={() => setSelectedMethod("bank-payment")}
      >
        Bank
      </button>
    </div>
  );
};

SliderToggle.propTypes = {
  selectedMethod: PropTypes.string.isRequired,
  setSelectedMethod: PropTypes.func.isRequired,
};

export default SliderToggle;