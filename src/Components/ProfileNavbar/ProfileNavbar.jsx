// import from 'react';
// import './ProfileNavbar.css';

// const ProfileNavbar = () => {
//   return (
//     <div className="profile-navbar">
//       <img 
//         src="https://via.placeholder.com/40" 
//         alt="Profile" 
//         className="profile-img" 
//       />
//       <span className="profile-email">Admin786@gmail.com</span>
//     </div>
//   );
// };

// export default ProfileNavbar;



// import{ useState, useEffect } from 'react';
// import './ProfileNavbar.css';

// const ProfileNavbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch the user's information from your authentication system
//     // Replace the below code with actual user data fetching logic
//     const loggedInUser = {
//       email: 'Admin786@gmail.com',
//       photoUrl: '../assets/user.png', // Replace with actual photo URL
//     };

//     setUser(loggedInUser);
//   }, []);

//   if (!user) return null; // Don't display anything if the user isn't logged in

//   return (
//     <div className="profile-navbar">
//       <img 
//         src={user.photoUrl} 
//         alt="Profile" 
//         className="profile-img" 
//       />
//       <span className="profile-email">{user.email}</span>
//     </div>
//   );
// };

// export default ProfileNavbar;





// import { useState, useEffect } from 'react';
// import './ProfileNavbar.css';

// const ProfileNavbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Simulate fetching the user's information from your authentication system
//     setTimeout(() => {
//       const loggedInUser = {
//         email: 'Admin786@gmail.com',
//         photoUrl: '/src/Components/assets/user.png', // Replace with actual photo URL
//       };
//       setUser(loggedInUser);
//     }, 1000); // Simulate a delay for fetching user data
//   }, []);

//   return (
//     <div className="profile-navbar">
//       <img
//         src={user ? user.photoUrl : '/src/Components/assets/user.png'} // Default avatar path
//         alt="Profile"
//         className="profile-img"
//       />
//       <span className="profile-email">{user ? user.email : ''}</span>
//     </div>
//   );
// };

// export default ProfileNavbar;




// import { useState, useEffect } from 'react';
// import './ProfileNavbar.css';
// // import user from '../assets/user.png'

// const ProfileNavbar = () => {
//   const [user, setUser] = useState(null);


//   useEffect(() => {
//     // Simulate fetching the user's information from your authentication system
//     setTimeout(() => {
//       const loggedInUser = {
//         email: 'Admin786@gmail.com',
//         photoUrl: '/src/Components/assets/user.png', // Replace with the actual photo URL
//       };
//       setUser(loggedInUser);
//     }, 1000); // Simulate a delay for fetching user data
//   }, []);

//   return (
//     <div className="profile-navbar">
//       <img
//         src={user && user.photoUrl ? user.photoUrl : '/src/Components/assets/user.png'} // Default avatar path
//         alt="Profile"
//         className="profile-img"
//       />
//       <span className="profile-email">{user ? user.email : ''}</span>
//     </div>
//   );
// };

// export default ProfileNavbar;



import { useState, useEffect } from 'react';
import './ProfileNavbar.css';

const ProfileNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching the user's information from your authentication system
    setTimeout(() => {
      const loggedInUser = {
        email: 'Admin786@gmail.com',
        photoUrl: '/public/user.png', // New path to the photo in the public directory
      };
      setUser(loggedInUser);
    }, 1000); // Simulate a delay for fetching user data
  }, []);

  return (
    <div className="profile-navbar">
      <img
        src={user && user.photoUrl ? user.photoUrl : '/assets/user.png'} // Updated default avatar path
        alt="Profile"
        className="profile-img"
      />
      <span className="profile-email">{user ? user.email : ''}</span>
    </div>
  );
};

export default ProfileNavbar;