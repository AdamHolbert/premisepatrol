import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        
        this.auth = app.auth();
        this.db = app.database();
    }
    
    // *** Auth API ***
    
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    
    doSignOut = () =>
        this.auth.signOut();
    
    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    
    deleteUser = () =>
        this.auth.currentUser.delete();
    
    adamLog = () => {
        return this.doSignInWithEmailAndPassword("adam@fake.account", "123456");
    };
    
    anonLog = () => {
        return this.doSignInWithEmailAndPassword("testAuthor@fake.account", "123456");
    };
    
    dakotaLog = () => {
        return this.doSignInWithEmailAndPassword("dakotaKrout@ymail.com", "123456");
    };
    
    
    // *** user API ***
    
    user = uid => this.db.ref(`users/${uid}`);
    
    users = () => this.db.ref('users');
    
    author = authorId => this.db.ref(`authorList/${authorId}`);
    
    authors = () => this.db.ref('authorList');
    
    permission = (authorId, userId) => this.db.ref(`authorData/${authorId}/permissions/${userId}`);
    
    admin = (userId) => this.db.ref(`adminPermissions/${userId}`);
    
    update = (updates) => this.db.ref().update(updates);
}

export default Firebase;