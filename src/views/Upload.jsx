import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFile, useMedia } from '../hooks/apiHooks';
import useForm  from '../hooks/formHooks';

const Upload = () => {
    const [file, setFile] = useState(null);
    const { postFile } = useFile();
    const { postMedia } = useMedia();
    const navigate = useNavigate();

    const initValues = {
        title: '',
        description: '',
    }
    const load = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!file || !token) return;

            const fileResult = await postFile( file, token);
            console.log("File uploaded:", fileResult);
            const mediaData = fileResult.data || fileResult;

            await postMedia(mediaData, inputs, token);
            navigate('/');
        } catch (error) {
            console.error("Upload failed",error);
        }
    };
    const {inputs, handleInputChange, handleSubmit} = useForm(load, initValues);

    const handleFileChange = (event) => {
        if (event.target.files.length && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

return(
    <div className="p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Media</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="title" className="block mb-1">Title</label>
                <input
                    name="title"
                    type="text"
                    id="title"
                    value={inputs.title}
                    className="w-full border p-2 rounded"
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block mb-1">Description</label>
                <textarea
                    name="description"
                    value={inputs.description}
                    rows={5}
                    id="description"
                    className="w-full border p-2 rounded"
                    onChange={handleInputChange}
                ></textarea>
            </div>
            <div>
                <label htmlFor="file" className="block mb-1">File</label>
                <input
                    name="file"
                    type="file"
                    id="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                />
            </div>


            <div className="flex justify-center my-4">
                <img
                    src={
                        file
                            ? URL.createObjectURL(file)
                            : 'https://placehold.co/200?text=Choose+image'
                    }
                    alt="preview"
                    className="w-[200px] h-auto rounded shadow"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={!file || inputs.title.length < 3}
            >
                Upload
            </button>
        </form>
    </div>
)};



export default Upload;