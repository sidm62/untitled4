import { useState, useEffect } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
    const [user, setUser] = useState(null);
    const { getUserByToken } = useUser();

    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getUserByToken(token);
                    setUser(userData.user);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getProfile();
    }, []);

    return (
        <section>
            <h1>Profile</h1>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </section>
    );
};

export default Profile;