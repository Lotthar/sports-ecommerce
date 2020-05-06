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

export { getFBUserByUID };
