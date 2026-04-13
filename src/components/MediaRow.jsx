import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';
import { useMedia } from '../hooks/apiHooks';

const MediaRow = ({ item }) => {
    const { user } = useUserContext();
    const { deleteMedia } = useMedia();
    const navigate = useNavigate();

    // Tarkistetaan onko käyttäjä kirjautunut, onko hän omistaja vai admin
    const isOwner = user && (user.user_id === item.user_id || user.level_name === 'Admin');

    const handleModify = () => {
        console.log("modify", item);

    };

    const handleDelete = async () => {
        console.log("delete", item);
        if (window.confirm('Haluatko varmasti poistaa tämän kohteen?')) {
            try {
                const token = localStorage.getItem('token');
                await deleteMedia(item.media_id, token);
                navigate(0);
            } catch (error) {
                console.error('Poisto epäonnistui:', error);
            }
        }
    };

    return (
        <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="p-3">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
            </td>
            <td className="p-3">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-400">Lataaja: {item.username}</p>
            </td>
            <td className="p-3">
                <div className="flex flex-wrap gap-2">

                    <Link
                        to="/single"
                        state={{ item }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
                    >
                        View
                    </Link>


                    {isOwner && (
                        <>
                            <button
                                onClick={handleModify}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm transition"
                            >
                                Modify
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default MediaRow;