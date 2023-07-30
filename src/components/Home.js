import React from "react";
import AddNote from "./AddNote";

function Home() {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "135px" }}>
        <AddNote />
      </div>
    </div>
  );
}

export default Home;
