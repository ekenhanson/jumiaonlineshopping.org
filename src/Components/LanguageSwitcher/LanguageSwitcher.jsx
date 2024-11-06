// // import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Dropdown } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // Import flag images
// import enFlag from '../assets/englishflag.png';
// import esFlag from '../assets/esflag.webp';
// import './LanguageSwitcher.css'

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const handleLanguageChange = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic">
//         <img src={enFlag} alt="Language" className="flag-icon" /> {/* Default flag */}
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item onClick={() => handleLanguageChange('en')}>
//           <img src={enFlag} alt="English" className="flag-icon" />
//           English
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => handleLanguageChange('es')}>
//           <img src={esFlag} alt="Spanish" className="flag-icon" />
//           Español
//         </Dropdown.Item>
//         {/* Add more languages as needed */}
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default LanguageSwitcher;


// // import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Dropdown } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // Import flag images
// import enFlag from '../assets/englishflag.png';
// import esFlag from '../assets/esflag.webp';
// // Import Font Awesome for the globe icon
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGlobe } from '@fortawesome/free-solid-svg-icons';
// import './LanguageSwitcher.css';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const handleLanguageChange = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0">
//         <FontAwesomeIcon icon={faGlobe} className="text-dark" /> {/* Globe icon */}
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item onClick={() => handleLanguageChange('en')}>
//           <img src={enFlag} alt="English" className="flag-icon" />
//           English
//         </Dropdown.Item>
//         <Dropdown.Item onClick={() => handleLanguageChange('es')}>
//           <img src={esFlag} alt="Spanish" className="flag-icon" />
//           Español
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default LanguageSwitcher;




// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Dropdown } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import enFlag from '../assets/englishflag.png';
// import esFlag from '../assets/esflag.webp';
// import './LanguageSwitcher.css';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
//   const [selectedFlag, setSelectedFlag] = useState(enFlag); // Default flag is English

//   const handleLanguageChange = (lng, flag) => {
//     i18n.changeLanguage(lng);
//     setSelectedFlag(flag); // Update the selected flag
//   };

//   return (
//     <div className="language-switcher">
//       <Dropdown>
//         <Dropdown.Toggle variant="light" id="dropdown-basic">
//           <i className="bi bi-globe"></i> {/* Bootstrap Globe Icon */}
//           <img src={selectedFlag} alt="Selected Language" className="flag-icon ms-2" />
//         </Dropdown.Toggle>

//         <Dropdown.Menu align="end" className="dropdown-menu-end">
//           <Dropdown.Item onClick={() => handleLanguageChange('en', enFlag)}>
//             <img src={enFlag} alt="English" className="flag-icon" /> English
//           </Dropdown.Item>
//           <Dropdown.Item onClick={() => handleLanguageChange('es', esFlag)}>
//             <img src={esFlag} alt="Spanish" className="flag-icon" /> Español
//           </Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// };

// export default LanguageSwitcher;




import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import flag images
import enFlag from '../assets/englishflag.png';
import esFlag from '../assets/esflag.webp';
import { Globe } from 'react-bootstrap-icons';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedFlag, setSelectedFlag] = useState(esFlag); // Default to Spanish flag

  useEffect(() => {
    if (i18n.language === 'en') {
      setSelectedFlag(enFlag);
    } else {
      setSelectedFlag(esFlag);
    }
  }, [i18n.language]);

  const handleLanguageChange = (lng, flag) => {
    i18n.changeLanguage(lng);
    setSelectedFlag(flag); // Update the selected flag
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="transparent" id="dropdown-basic">
        <Globe className="me-2" /> {/* Bootstrap Globe Icon */}
        <img src={selectedFlag} alt="Language" className="flag-icon" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end"> {/* Align dropdown to the end for better mobile view */}
        <Dropdown.Item onClick={() => handleLanguageChange('en', enFlag)}>
          <img src={enFlag} alt="English" className="flag-icon" />
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleLanguageChange('es', esFlag)}>
          <img src={esFlag} alt="Spanish" className="flag-icon" />
          Español
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;