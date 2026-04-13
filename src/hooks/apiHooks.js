import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData.js';

const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const getMedia = async () => {
        try {

            const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');


            const withUsername = await Promise.all(
                json.map(async (item) => {
                    try {
                        const userResult = await fetchData(
                            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
                        return { ...item, username: userResult.username };
                    } catch (e) {
                        return { ...item, username: 'Unknown User' };
                    }
                })
            );

            setMediaArray(withUsername);
        } catch (error) {
            console.error('useMedia, getMedia failed:', error);
        }
    };

    useEffect(() => {
        getMedia();
    }, []);

    const postMedia = async (fileData, inputs, token) => {
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputs.title,
                description: inputs.description,
                filename: fileData.filename,
                media_type: fileData.media_type,
                filesize: fileData.filesize,
            }),
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media', options);
    };
    const deleteMedia = async (id, token) => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + id, options);
    };

    const putMedia = async (id, data, token) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(data),
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + id, options);
    };


    return { mediaArray, getMedia, postMedia, putMedia, deleteMedia };
};
const useAuthentication = () => {
    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
    };
    return { postLogin };
};

const useUser = () => {
    const getUserByToken = async (token) => {
        const fetchOptions = {
            headers: { Authorization: 'Bearer ' + token },
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', fetchOptions);
    };

    const postUser = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        };
        return await fetchData(import.meta.env.VITE_AUTH_API + '/users', fetchOptions);
    };

    return { getUserByToken, postUser };
};

const useFile = () => {
    const postFile = async (file, token) => {
        const formData = new FormData();
        formData.append('file', file);

        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: formData,
        };
        return await fetchData(import.meta.env.VITE_UPLOAD_SERVER + '/upload', options);
    };

    return { postFile };

};

const useLike = () => {
    const postLike = async (media_id, token) => {
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ media_id }),
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes', options);
    };

    const deleteLike = async (like_id, token) => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes/' + like_id, options);
    };

    const getLikeMedia = async (media_id) => {
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes/count/' + media_id);
    };

    const getLikeUser = async (media_id, token) => {
        const options = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes/mymedia/' + media_id, options);
    };


    return { postLike, deleteLike, getLikeMedia, getLikeUser };
};

export { useMedia, useAuthentication, useUser, useFile, useLike };