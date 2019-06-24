import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

import { FirebaseConfig } from './keys';
firebase.initializeApp(FirebaseConfig)


const databaseRef = firebase.database().ref();
export const userRef = databaseRef.child('users')
export const socialActionsRef = databaseRef.child('user engagement')