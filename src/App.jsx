import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './contexts/UserContexts.jsx';

const App = () => {
    return (
        <BrowserRouter basename="/~sidm/routing">
            <UserProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/single" element={<Single />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <Upload />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;