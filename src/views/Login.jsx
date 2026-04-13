import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
    const [toggle, setToggle] = useState(true);

    return (
        <>
            {toggle ? <LoginForm /> : <RegisterForm />}
            <button onClick={() => setToggle(!toggle)}>
                {toggle ? 'Go to Register' : 'Go to Login'}
            </button>
        </>
    );
};

export default Login;