import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

// Pages (create these files as stubs for now)
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Dashboard from "@/pages/Dashboard"
import ScanBarcode from "@/pages/ScanBarcode"
import ScanImage from "@/pages/ScanImage"
import ProductResult from "@/pages/ProductResult"
import History from "@/pages/History"
import Profile from "@/pages/Profile"

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth()
    return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/scan/barcode" element={<PrivateRoute><ScanBarcode /></PrivateRoute>} />
                <Route path="/scan/image" element={<PrivateRoute><ScanImage /></PrivateRoute>} />
                <Route path="/product/:id" element={<PrivateRoute><ProductResult /></PrivateRoute>} />
                <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    )
}
