import React from 'react';

const UserProfile: React.FC = () => {
    const user = {
        name: 'John Doe',
        username: 'johndoe123',
        bio: 'Web Developer, Coffee Lover, and Music Enthusiast.',
        email: 'johndoe@example.com',
        profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-4xl w-full">
                <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                    <img
                        src={user?.profilePicture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-teal-500 mb-4 sm:mb-0"
                    />
                    <div className="text-center sm:text-left">
                        <h2 className="text-3xl font-semibold text-gray-800">{user?.name}</h2>
                        <p className="text-teal-500">@{user?.username}</p>
                        <p className="mt-2 text-gray-600">{user?.bio}</p>
                        <p className="mt-2 text-gray-500">{user?.email}</p>
                        <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
