import React, { useContext } from "react";
import AlertContext from "../context/alert/alertContext";

function Alert() {
  const alertContext = useContext(AlertContext);
  const { alertState } = alertContext;

  return (
    <div className={`alert alert-${alertState.type}`} style={{ zIndex: "5", position: "sticky", top: "57px", textAlign: "center", fontWeight: "600" }} role="alert">
      {alertState.message}
    </div>
  );
}

export default Alert;
