import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./reduxFiles/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingAbout from "./pages/LandingAbout/LandingAbout";
import LandingFaqs from "./pages/LandingFaqs/LandingFaqs";
import UserDashboardPage from "./pages/UserDashboardPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Landing from "./pages/Landing/Landing";
import EventDashboard from "./Components/Event/EventDashboard";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Landing />} />
      <Route path="/about" element={<LandingAbout />} />
      <Route path="/faqs" element={<LandingFaqs />} />
      <Route path="/user-dashboard" element={<UserDashboardPage />} />
      <Route path="/event-dashboard/:eventid" element={<EventDashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/passwordreset" element={<ForgotPasswordPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
