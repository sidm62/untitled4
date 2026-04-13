import { useLocation, useNavigate } from 'react-router-dom';
import Likes from '../components/Likes';

const Single = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const item = state?.item;

    if (!item) {
        return (
            <section className="p-8 text-center">
                <p className="text-xl mb-4">No item selected</p>
                <button
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                    onClick={() => navigate(-1)}
                >
                    Go back
                </button>
            </section>
        );
    }

    return (
        <section className="max-w-4xl mx-auto p-4 md:p-8">
            <button
                className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                onClick={() => navigate(-1)}
            >
                <span>←</span> Go back
            </button>

            <figure className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">

                <div className="bg-black flex justify-center items-center min-h-[300px]">
                    {item.media_type.includes('video') ? (
                        <video controls src={item.filename} className="max-h-[600px] w-full" />
                    ) : (
                        <img src={item.filename} alt={item.title} className="max-h-[600px] w-auto object-contain" />
                    )}
                </div>

                <figcaption className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 text-white">{item.title}</h2>
                            <p className="text-gray-300 text-lg mb-6">{item.description}</p>
                        </div>


                        <div className="shrink-0">
                            <Likes item={item} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-700 text-sm text-gray-400">
                        <p><strong className="text-gray-200">Owner:</strong> {item.username}</p>
                        <p><strong className="text-gray-200">Type:</strong> {item.media_type}</p>
                        <p><strong className="text-gray-200">Size:</strong> {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
                        <p><strong className="text-gray-200">Uploaded:</strong> {new Date(item.created_at).toLocaleString('fi-FI')}</p>
                    </div>
                </figcaption>
            </figure>
        </section>
    );
};

export default Single;