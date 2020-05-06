import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

/**
 * Gets Firebase's auth service
 * https://firebase.google.com/docs/reference/js/firebase.auth.html#callable
 * @return {Interface} The Firebase Auth service interface
 */
const auth = () => {
  return firebase.auth();
};

const db = () => {
  return firebase.firestore();
};

/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */
const fBInit = config => {
  return firebase.initializeApp(config);
};

export default { auth, fBInit, db };
