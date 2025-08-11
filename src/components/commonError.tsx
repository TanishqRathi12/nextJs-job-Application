import React from 'react';

const CommonError = ({ message = "Something went wrong. Please try again later." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-red-600 mb-2">An Error Occurred</h1>
            <p className="text-base text-gray-700 text-center">{message}</p>
            </div>
        </div>
    );
};

export default CommonError;
