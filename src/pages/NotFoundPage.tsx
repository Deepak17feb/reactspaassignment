import React from "react";
import { Link } from "react-router-dom";
// import "./NotFoundPage.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
