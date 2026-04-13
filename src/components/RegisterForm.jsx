import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = () => {
    const { postUser } = useUser();

    const initValues = {
        username: '',
        password: '',
        email: '',
    };

    const doRegister = async () => {
        try {
            const registerResult = await postUser(inputs);
            console.log('Rekisteröinti onnistui:', registerResult);
            alert('Käyttäjä luotu! Voit nyt kirjautua sisään.');
        } catch (error) {
            console.error('Rekisteröinti epäonnistui:', error);
            alert(error.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, initValues);

    return (
        <section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reguser">Username</label>
                    <input
                        name="username"
                        type="text"
                        id="reguser"
                        onChange={handleInputChange}
                        value={inputs.username}
                        autoComplete="username"
                    />
                </div>
                <div>
                    <label htmlFor="regemail">Email</label>
                    <input
                        name="email"
                        type="email"
                        id="regemail"
                        onChange={handleInputChange}
                        value={inputs.email}
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label htmlFor="regpassword">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="regpassword"
                        onChange={handleInputChange}
                        value={inputs.password}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </section>
    );
};

export default RegisterForm;