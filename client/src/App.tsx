import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Cart from "./components/Cart"

const App = () => {
  return <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>
  </>
}

export default App