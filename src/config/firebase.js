import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { FirebaseConfig } from './keys';

class Firebase {
	constructor(){
		firebase.initializeApp(FirebaseConfig);
		this.auth = firebase.auth();
		this.database = firebase.database();
		this.ref = firebase.database().ref();
	}

	// *** Logging ***//
	doEnableLogging = () => firebase.database.enableLogging(true);

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email,password);

	doSignInWithEmailAndPassword = (email, password) => 
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	currentUser = () => this.auth.currentUser;
	
	doSnapshot = ref => this.database.ref(ref);
	doFanOutUpdate = updates => this.ref.update(updates);
	getChild = child => this.ref.child(child);
}

export default Firebase;
