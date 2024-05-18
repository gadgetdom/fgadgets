import React, { useEffect, useState } from 'react';
import firebase from './firebase';

export const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            const db = firebase.firestore();
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        setUserData(doc.data());
                    } else {
                        console.log("No such document!");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    }, []);

    return (
        <div className='Profile-container'>
            {userData ? (
                <>
                    <h4>Welcome, <p>{userData.firstName}</p></h4>
                    <div className="avatar">
                        <img src={userData.avatarUrl} alt="User avatar" />
                    </div>
                    <div className="user-name">{userData.name}</div>
                    <div className="user-email">{userData.email}</div>
                    <div className="user-phone">{userData.phone}</div>
                    <div className="user-address">{userData.address}</div>
                    <div className="shipping-address">{userData.shippingAddress}</div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
