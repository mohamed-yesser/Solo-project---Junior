import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileBio = ({ user }) => {
    const [profilePic, setProfilePic] = useState('');
    const [image, setImage] = useState(null);
    const [showProfilePic, setShowProfilePic] = useState(true);

    useEffect(() => {
        fetchProfilePicture();
    }, [user.id]);

    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get(`http://localhost:1128/media/profile/${user.id}`);
            if (response.data && response.data.link) {
                setProfilePic(response.data.link);
            }
        } catch (err) {
            console.log('Error fetching profile picture:', err);
        }
    };

    const uploadImage = async () => {
        try {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'bk5jum3d');
            data.append('cloud_name', 'dr07atq6z');
            const response = await axios.post('https://api.cloudinary.com/v1_1/dr07atq6z/image/upload', data);

            const imageUrl = response.data.url;
            setProfilePic(imageUrl);
            await saveProfilePicture(imageUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const saveProfilePicture = async (imageUrl) => {
        try {
            await axios.post('http://localhost:1128/media', {
                link: imageUrl,
                type: 'profile',
                UserId: user.id
            });
        } catch (err) {
            console.error('Error saving profile picture:', err);
        }
    };

    const handleProfilePicUpload = (event) => {
        event.preventDefault();
        if (image) {
            uploadImage();
        }
    };

    const handleDeleteProfilePic = async () => {
        try {
            await axios.delete(`http://localhost:1128/media/profile/${user.id}`);
            setProfilePic(''); 
        } catch (err) {
            console.error('Error deleting profile picture:', err);
        }
    };

    const handleInputChange = (event) => {
        setImage(event.target.files[0]);
    };

    const toggleProfilePicVisibility = () => {
        setShowProfilePic(prevState => !prevState);
    };

    return (
        <div className="profile-bio">
            {showProfilePic && profilePic && (
                <img
                    src={profilePic}
                    alt="Profile"
                    style={{
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ddd'
                    }}
                />
            )}
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            
            <div className="profile-picture-upload">
                <input 
                    type="file" 
                    onChange={handleInputChange}
                />
                <button onClick={handleProfilePicUpload}>
                    Upload Profile Picture
                </button>
                {profilePic && (
                    <button onClick={handleDeleteProfilePic}>
                        Delete Profile Picture
                    </button>
                )}
                <button onClick={toggleProfilePicVisibility}>
                    {showProfilePic ? 'Hide Profile Picture' : 'Show Profile Picture'}
                </button>
            </div>
        </div>
    );
};

export default ProfileBio;
