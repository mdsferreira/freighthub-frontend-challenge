import React from "react";
import Alert from "@material-ui/lab/Alert";

export default function StatusText({ status }) {
  return (
    <Alert
      icon={false}
      severity={mapStatus[status] || "info"}
      style={{ placeContent: "center" }}
    >
      {status}
    </Alert>
  );
}

const mapStatus = {
  NEW: "info",
  ACTIVE: "warning",
  COMPLETED: "success",
};
