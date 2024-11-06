

import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';
import App from './App.jsx'
import Homepage from "./Components/Homepage/Homepage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Profile from "./Components/Profile/Profile.jsx";
import Registration from "./Components/Registration/Registration.jsx";
import Login from "./Components/Login/Login.jsx";
import GrabOrder from "./Components/GrabOrder/GrabOrder.jsx";
import Account from "./Components/Account/Account.jsx";
import Withdrawal from "./Components/WithdrawalPage/Withdrawal.jsx";
import Recharge from "./Components/Recharge/Recharge.jsx";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/grab-order",
    element: <GrabOrder />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/withdraw",
    element: <Withdrawal />,
  },
  {
    path: "/recharge-account",
    element: <Recharge />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
 
  {
    path: "/profile",
    element: <Profile />,
  },
]);
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    // if you're using a language detector, do not define the lng option
    supportedLangs: ['es', 'en'],
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "path",
        "subdomain",
      ],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: { useSuspence: false},
  });

// function App() {
//   const { t } = useTranslation();

//   return <h2>{t("Welcome_to_React")}</h2>;
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);