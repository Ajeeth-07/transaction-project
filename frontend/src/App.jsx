import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Signin } from "./files/Signin";
import  Signup  from "./files/Signup";
import { Dashboard } from "./files/Dashboard";
import { Send } from "./files/Send";
function App() {

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<Send/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
