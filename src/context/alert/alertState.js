import React, { useState } from "react";
import AlertContext from "./alertContext";

function AlertState(props) {
  const [alertState, setAlertState] = useState({ show: false, type: "primary", message: "Default MSG!" });

  const sleep = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  };

  const toggleAlertState = async (type, message) => {
    if (alertState.show) {
      await sleep(4000);
    }
    setAlertState({
      show: true,
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlertState({ show: false, type: "primary", message: "Default MSG!" });
    }, 4000);
  };

  return <AlertContext.Provider value={{ toggleAlertState, alertState }}>{props.children}</AlertContext.Provider>;
}

export default AlertState;
