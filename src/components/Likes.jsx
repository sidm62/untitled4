
import { useState, useEffect } from 'react';
import { useLike } from '../hooks/apiHooks';
import { useUserContext } from '../hooks/contextHooks';

const Likes = ({ item }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [userLike, setUserLike] = useState(null);
    const { postLike, deleteLike, getLikeCountByMediaId, getLikeByUser } = useLike();
    const { user } = useUserContext();

    const getLikes = async () => {
        try {
            const countResponse = await getLikeCountByMediaId(item.media_id);
            setLikeCount(countResponse.count);

            const token = localStorage.getItem('token');
            if (user && token) {
                const userLikeResponse = await getLikeByUser(item.media_id, token);
                setUserLike(userLikeResponse);
            }
        } catch (e) {
            console.log('getLikes error', e.message);
        }
    };

    useEffect(() => {
        getLikes();
    }, [item, user]);

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token');
            if (userLike) {
                await deleteLike(userLike.like_id, token);
                setUserLike(null);
            } else {
                await postLike(item.media_id, token);
            }
            getLikes(); // Päivitetään tilanne palvelimelta
        } catch (e) {
            console.log('handleLike error', e.message);
        }
    };

    return (
        <div className="flex items-center gap-3 my-4">
            <button
                onClick={handleLike}
                disabled={!user}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                    userLike
                        ? 'bg-red-500 text-white shadow-md'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
                <span className="text-xl">{userLike ? '' : '🤍'}</span>
                <span className="font-bold">{userLike ? 'Liked' : 'Like'}</span>
            </button>
            <span className="text-lg font-semibold text-gray-200">
                {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </span>
        </div>
    );
};

export default Likes;