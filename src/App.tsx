import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import User from "./pages/User"
import Login from "./pages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App