import React from 'react';

const ProfileBioGuest = ({ guest }) => {
    return (
        <div className="profile-bio">
            <img src="https://www.shutterstock.com/image-vector/facebook-profile-icon-vector-social-260nw-465585254.jpg" alt="Profile" />
            <h2>{guest.name}</h2>
            <p>Email: {guest.email}</p>
            <p>Age: {guest.age}</p>
        </div>
    );
};

export default ProfileBioGuest;
