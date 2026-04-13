import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const {postLogin} = useAuthentication();
    const {getUserByToken} = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (credentials) => {
        try {
            const loginResult = await postLogin(credentials);
            localStorage.setItem('token', loginResult.token);
            setUser(loginResult.user);
            navigate('/');
        } catch (e) {
            throw new Error(e.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userResult = await getUserByToken(token);
                setUser(userResult.user);
                // Ohjataan takaisin sinne missä oltiin ennen refreshia
                navigate(location.pathname);
            }
        } catch (e) {
            console.log("Autologin epäonnistui:", e.message);
            localStorage.removeItem('token');
        }
    };

    return (
        <UserContext.Provider value={{user, handleLogin, handleLogout, handleAutoLogin}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserProvider, UserContext};