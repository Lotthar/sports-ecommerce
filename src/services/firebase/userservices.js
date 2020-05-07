import baseService from "./base";

const EMAIL = "sportskaopremaweb@gmail.com";
const PASS = "prodavnica123";

const usersCollection = baseService.db().collection("users");

const userFBSignIn = async credential => {
  let response = await baseService
    .auth()
    .signInWithEmailAndPassword(credential.email, credential.password);
  return response;
};

const getFBUserByUID = async uid => {
  try {
    // const loggedUser = await userFBSignIn({ email: EMAIL, password: PASS });
    const fbUser = await usersCollection.doc(uid).get();
    return fbUser;
  } catch (error) {
    if (error.code === "permission-denied") {
      console.log(
        "Korisnik nema dozvolu da izvrsi ove radnje, user uid: " + uid
      );
    } else {
      console.log(
        "Nesto nije u redu pri dovlacenju user iz firebase-a sa id-em: " +
          uid +
          " error: " +
          error
      );
    }
  }
};

// Get firebase auth user
const authUser = () => {
  return firebase.auth().currentUser;
};
// Add user to session if firebase login is successful and email verified
export const loggUser = () => {
  let user = authUser();
  if (!user.emailVerified) return false;
  return true;
};

const setSessionCookies = uid => {
  try {
    Cookies.set("todoSessionId", uid, {
      expires: 1,
      path: "/"
    });
    console.log("Session/Cookies user set successfuly");
    return true;
  } catch (error) {
    console.log("Error storing user inside a session/cookies", error);
    return false;
  }
};

// Returns user from firebase
const getUserFirebase = async userUID => {
  try {
    // const loggedUser = await userFBSignIn({ email: EMAIL, password: PASS });
    const fbUser = await usersCollection.doc(uid).get();
    return fbUser;
  } catch (error) {
    if (error.code === "permission-denied") {
      console.log(
        "Korisnik nema dozvolu da izvrsi ove radnje, user uid: " + uid
      );
    } else {
      console.log(
        "Nesto nije u redu pri dovlacenju user iz firebase-a sa id-em: " +
          uid +
          " error: " +
          error
      );
    }
  }
};

const loggedUser = async () => {
  try {
    let cookieUserId = Cookies.get("todoSessionId");
    if (!cookieUserId) return null;
    let sessionStorageUser = await getUserFirebase(cookieUserId);
    return { uid: sessionStorageUser.id, data: sessionStorageUser.data() };
  } catch (error) {
    console.log("Neka je greska sa vracanjem session/cookie usera");
  }
};

const signOutSession = () => {
  Cookies.remove("todoSessionId", {
    expires: 1,
    path: "/"
  });
};

//Creating new user with Email and password
const firebaseRegisterUser = async credential => {
  let result = await firebase
    .auth()
    .createUserWithEmailAndPassword(credential.email, credential.password);
  return result;
};

// firebase sign in method for givent email and password in credentials object
const firebaseSignIn = async credential => {
  let response = await firebase
    .auth()
    .signInWithEmailAndPassword(credential.email, credential.password);
  return response;
};

// Firebase signout method
const firebaseSignOut = async () => {
  let response = await firebase.auth().signOut();
  return response;
};

// //Firebase update user method
// const updateUser = async updates => {
//   let user = authUser();
//   if (user === null) return false;
//   const response = await user.updateProfile({
//     displayName: updates.displayName,
//     photoURL: updates.photoURL
//   });
//   return response;
// };

// Firebase update users email method
const updateUserEmail = async email => {
  let user = authUser();
  if (user === null) return false;
  let response = await user.updateEmail(email);
  return response;
};

//Firebase send user verification email
const sendEmailVerification = async () => {
  let user = authUser();
  if (user === null) return false;
  let response = await user.sendEmailVerification();
  return response;
};

//Firebase password reset email
const sendPasswordResetEmail = async email => {
  let auth = firebase.auth();
  let response = await auth.sendPasswordResetEmail(email);
  return response;
};

//Firebase delete user
const deleteUser = async () => {
  let user = authUser();
  if (user == null) return false;
  let response = await user.delete();
  return response;
};

//Firebase reauthenticate user
const reauthenticateUser = async credential => {
  let user = authUser();
  if (user == null) return false;
  let response = await user.reauthenticateWithCredential(credential);
  return response;
};

export { getFBUserByUID };
