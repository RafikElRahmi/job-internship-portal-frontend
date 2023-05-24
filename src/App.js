import React from "react";
import Routerdom from "./routes/Routerdom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routerdom />
    </BrowserRouter>
  );
}

export default App;
