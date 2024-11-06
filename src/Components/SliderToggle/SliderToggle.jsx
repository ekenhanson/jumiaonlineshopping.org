
import PropTypes from "prop-types";
import "./SliderToggle.css";
import { useTranslation } from 'react-i18next';

const SliderToggle = ({ selectedMethod, setSelectedMethod }) => {
  const { t } = useTranslation();
  return (
    <div className="slider-toggle">
      {/* <button
        className={`toggle-button rounded-start-5 ${selectedMethod === "crypto" ? "active" : ""}`}
        onClick={() => setSelectedMethod("crypto")}
      >
        {t('wallet_payment')}
      </button> */}
      <button
        className={`toggle-button rounded-end-5 ${selectedMethod === "bank" ? "active" : ""}`}
        onClick={() => setSelectedMethod("bank")}
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