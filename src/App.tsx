import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import User from "./pages/User"
import Signin from "./pages/Signin"
import Error from "./pages/Error"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<User />} />
                <Route path="/login" element={<Signin />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App