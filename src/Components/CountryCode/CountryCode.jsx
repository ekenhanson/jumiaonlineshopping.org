// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const CountryDropdown = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     axios.get('https://restcountries.com/v3.1/all')
//       .then(response => {
//         const countryData = response.data.map(country => ({
//           name: country.name.common,
//           code: country.cca2,
//         }));
//         setCountries(countryData);
//       })
//       .catch(error => {
//         console.error('Error fetching the countries', error);
//       });
//   }, []);

//   return (
//     <select>
//       <option value="">Select a country</option>
//       {countries.map((country) => (
//         <option key={country.code} value={country.code}>
//           {country.name}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default CountryDropdown;// // // import { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const NavigationBar2 = () => {
// // //   const [countries, setCountries] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedCountry, setSelectedCountry] = useState(null);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// // //   useEffect(() => {
// // //     axios.get('https://restcountries.com/v3.1/all')
// // //       .then(response => {
// // //         const countryData = response.data.map(country => ({
// // //           name: country.name.common,
// // //           code: country.cca2,
// // //           flag: country.flags.svg,
// // //         }));
// // //         setCountries(countryData);
// // //         setLoading(false);
// // //       })
// // //       .catch(error => {
// // //         setError(error);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   if (loading) return <div>Loading...</div>;
// // //   if (error) return <div>Error loading countries</div>;

// // //   const handleCountryClick = (country) => {
// // //     setSelectedCountry(country);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   return (
// // //     <div className="custom-dropdown">
// // //       <div
// // //         className="selected-item"
// // //         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // //       >
// // //         <span style={{ marginRight: '8px' }}>Spanish /</span>
// // //         {selectedCountry ? (
// // //           <img
// // //             src={selectedCountry.flag}
// // //             alt={`${selectedCountry.name} flag`}
// // //             style={{ width: '20px', height: '20px', borderRadius: '50%' }}
// // //           />
// // //         ) : (
// // //           <img
// // //             src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
// // //             alt="Default flag"
// // //             style={{ width: '20px', height: '20px', borderRadius: '50%' }}
// // //           />
// // //         )}
// // //         <span style={{ marginLeft: '8px' }}>▼</span>
// // //       </div>
// // //       {isDropdownOpen && (
// // //         <div className="dropdown-menu">
// // //           {countries.map((country) => (
// // //             <div
// // //               key={country.code}
// // //               className="dropdown-item"
// // //               onClick={() => handleCountryClick(country)}
// // //             >
// // //               <img
// // //                 src={country.flag}
// // //                 alt={`${country.name} flag`}
// // //                 style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
// // //               />
// // //               {country.name}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //       <style jsx>{`
// // //         .custom-dropdown {
// // //           position: relative;
// // //           width: 200px;
// // //           cursor: pointer;
// // //         }
// // //         .selected-item {
// // //           padding: 10px;
// // //           border: 1px solid #ccc;
// // //           background: #fff;
// // //           display: flex;
// // //           align-items: center;
// // //         }
// // //         .dropdown-menu {
// // //           position: absolute;
// // //           top: 100%;
// // //           left: 0;
// // //           right: 0;
// // //           background: #fff;
// // //           border: 1px solid #ccc;
// // //           max-height: 200px;
// // //           overflow-y: auto;
// // //           z-index: 1000;
// // //         }
// // //         .dropdown-item {
// // //           padding: 10px;
// // //           display: flex;
// // //           align-items: center;
// // //           cursor: pointer;
// // //         }
// // //         .dropdown-item:hover {
// // //           background: #f0f0f0;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default NavigationBar2;

// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import styled from 'styled-components';

// // // Styled components
// // const CustomDropdown = styled.div`
// //   position: relative;
// //   width: 200px;
// //   cursor: pointer;
// // `;

// // const SelectedItem = styled.div`
// //   padding: 10px;
// //   border: 1px solid #ccc;
// //   background: #fff;
// //   display: flex;
// //   align-items: center;
// // `;

// // const DropdownMenu = styled.div`
// //   position: absolute;
// //   top: 100%;
// //   left: 0;
// //   right: 0;
// //   background: #fff;
// //   border: 1px solid #ccc;
// //   max-height: 200px;
// //   overflow-y: auto;
// //   z-index: 1000;
// // `;

// // const DropdownItem = styled.div`
// //   padding: 10px;
// //   display: flex;
// //   align-items: center;
// //   cursor: pointer;

// //   &:hover {
// //     background: #f0f0f0;
// //   }
// // `;

// // const NavigationBar2 = () => {
// //   const [countries, setCountries] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedCountry, setSelectedCountry] = useState(null);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// //   useEffect(() => {
// //     axios.get('https://restcountries.com/v3.1/all')
// //       .then(response => {
// //         const countryData = response.data.map(country => ({
// //           name: country.name.common,
// //           code: country.cca2,
// //           flag: country.flags.svg,
// //         }));
// //         setCountries(countryData);
// //         setLoading(false);
// //       })
// //       .catch(error => {
// //         setError(error);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error loading countries</div>;

// //   const handleCountryClick = (country) => {
// //     setSelectedCountry(country);
// //     setIsDropdownOpen(false);
// //   };

// //   return (
// //     <CustomDropdown>
// //       <SelectedItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
// //         <span style={{ marginRight: '8px' }}>Spanish /</span>
// //         {selectedCountry ? (
// //           <img
// //             src={selectedCountry.flag}
// //             alt={`${selectedCountry.name} flag`}
// //             style={{ width: '20px', height: '20px', borderRadius: '50%' }}
// //           />
// //         ) : (
// //           <img
// //             src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
// //             alt="Default flag"
// //             style={{ width: '20px', height: '20px', borderRadius: '50%' }}
// //           />
// //         )}
// //         <span style={{ marginLeft: '8px' }}>▼</span>
// //       </SelectedItem>
// //       {isDropdownOpen && (
// //         <DropdownMenu>
// //           {countries.map((country) => (
// //             <DropdownItem
// //               key={country.code}
// //               onClick={() => handleCountryClick(country)}
// //             >
// //               <img
// //                 src={country.flag}
// //                 alt={`${country.name} flag`}
// //                 style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
// //               />
// //               {country.name}
// //             </DropdownItem>
// //           ))}
// //         </DropdownMenu>
// //       )}
// //     </CustomDropdown>
// //   );
// // };

// // export default NavigationBar2;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const CustomDropdown = styled.div`
//   position: relative;
//   width: 200px;
//   cursor: pointer;
// `;

// const SelectedItem = styled.div`
//   padding: 10px;
//   border: 1px solid #ccc;
//   background: #fff;
//   display: flex;
//   align-items: center;
// `;

// const DropdownMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   left: 0;
//   right: 0;
//   background: #fff;
//   border: 1px solid #ccc;
//   max-height: 200px;
//   overflow-y: auto;
//   z-index: 1000;
// `;

// const DropdownItem = styled.div`
//   padding: 10px;
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   &:hover {
//     background: #f0f0f0;
//   }
// `;

// const NavigationBar2 = () => {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('');

//   useEffect(() => {
//     axios.get('https://restcountries.com/v3.1/all')
//       .then(response => {
//         const countryData = response.data.map(country => ({
//           name: country.name.common,
//           code: country.cca2,
//           flag: country.flags.svg,
//           languages: country.languages,
//         }));
//         setCountries(countryData);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading countries</div>;

//   const handleCountryClick = (country) => {
//     setSelectedCountry(country);
//     setSelectedLanguage(country.languages[0]); // Select the first language for simplicity
//     setIsDropdownOpen(false);
//   };

//   const renderLanguage = () => {
//     if (!selectedCountry || !selectedCountry.languages) return '';
//     return Object.values(selectedCountry.languages).join(', '); // Display all languages
//   };

//   return (
//     <CustomDropdown>
//       <SelectedItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//         <span style={{ marginRight: '8px' }}>{renderLanguage()} /</span>
//         {selectedCountry ? (
//           <img
//             src={selectedCountry.flag}
//             alt={`${selectedCountry.name} flag`}
//             style={{ width: '20px', height: '20px', borderRadius: '50%' }}
//           />
//         ) : (
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
//             alt="Default flag"
//             style={{ width: '20px', height: '20px', borderRadius: '50%' }}
//           />
//         )}
//         <span style={{ marginLeft: '8px' }}>▼</span>
//       </SelectedItem>
//       {isDropdownOpen && (
//         <DropdownMenu>
//           {countries.map((country) => (
//             <DropdownItem
//               key={country.code}
//               onClick={() => handleCountryClick(country)}
//             >
//               <img
//                 src={country.flag}
//                 alt={`${country.name} flag`}
//                 style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
//               />
//               {country.name}
//             </DropdownItem>
//           ))}
//         </DropdownMenu>
//       )}
//     </CustomDropdown>
//   );
// };

// export default NavigationBar2;
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CustomDropdown = styled.div`
  position: relative;
  width: 150px;
  cursor: pointer;
  border:none;
`;

const SelectedItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  background: #fff;
  display: flex;
  align-items: center;
   border:none;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const NavigationBar2 = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryData = response.data.map(country => ({
          name: country.name.common,
          code: country.cca2,
          flag: country.flags.svg,
          languages: country.languages,
        }));
        setCountries(countryData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading countries</div>;

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setSelectedLanguage(Object.values(country.languages).join(', ')); // Join all languages
    setIsDropdownOpen(false);
  };

  return (
    <CustomDropdown>
      <SelectedItem onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span style={{ marginRight: '8px' }}>{selectedLanguage} /</span>
        {selectedCountry ? (
          <img
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
          />
        ) : (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
            alt="Default flag"
            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
          />
        )}
        <span style={{ marginLeft: '8px' }}>▼</span>
      </SelectedItem>
      {isDropdownOpen && (
        <DropdownMenu>
          {countries.map((country) => (
            <DropdownItem
              key={country.code}
              onClick={() => handleCountryClick(country)}
            >
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
              />
              {country.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </CustomDropdown>
  );
};

export default NavigationBar2;