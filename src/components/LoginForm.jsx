import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';
import {useUserContext} from "../hooks/contextHooks.jsx";

const LoginForm = () => {
    const { handleLogin } = useUserContext();
    const navigate = useNavigate();

    const initValues = { username: '', password: '' };

    const doLogin = async () => {
        try {
            const loginResult = await handleLogin(inputs);
            localStorage.setItem('token', loginResult.token);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, initValues);

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
                <label htmlFor="loginuser">Username</label>
                <input name="username" type="text" id="loginuser" onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="loginpassword">Password</label>
                <input name="password" type="password" id="loginpassword" onChange={handleInputChange} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;