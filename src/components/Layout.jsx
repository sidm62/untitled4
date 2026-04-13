import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';
import { useEffect } from 'react';

const Layout = () => {
    const { user, handleAutoLogin, handleLogout } = useUserContext();

    useEffect(() => {
        handleAutoLogin();
    }, []);

    return (
        <div>
            <nav style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', justifyContent: 'center' }}>
                    <li><Link to="/">Home</Link></li>
                    {user ? (

                        <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                        ) : (

                        <li><Link to="/login">Login</Link></li>
                        )}
                </ul>
            </nav>
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;