import React from "react";
import Sidebar from "../Components/Nav/sidebar";

export default function Dashboard(props) {
  return (
    <main className="content">
      <Sidebar />
      <div className="page-container">{props.renderpage}</div>
    </main>
  );
}
