import React from "react";
import ResponsiveSidebar from "../Components/Nav/responsiveSidebar";
import "./layout.css";

export default function Dashboard(props) {
  return (
    <main className="content">
      <ResponsiveSidebar />
      <div className="page-container">{props.renderpage}</div>
    </main>
  );
}
