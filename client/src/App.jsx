import "./App.css";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./components/homepage";
import { Register } from "./components/Register";
import { useParams, 
 Navigate} from "react-router-dom";

import { Redirect } from 'react-router'

function App() {
  let { id } = useParams();
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/homepage"
          element={token && token.length > 0 ? <Homepage />  :<Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
