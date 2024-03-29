import firebaseService from "../services/firebase/base";

export default () => {
  let config = process.env.FIREBASE_CONFIG;
  if (!config) {
    config = {
      apiKey: "AIzaSyAxXZaXN83jXnY3Y9nAZOyj9Erb8OgzXZE",
      authDomain: "sports-wear-2a266.firebaseapp.com",
      databaseURL: "https://sports-wear-2a266.firebaseio.com",
      projectId: "sports-wear-2a266",
      storageBucket: "sports-wear-2a266.appspot.com",
      messagingSenderId: "166808183206",
      appId: "1:166808183206:web:26e8d66889bf725fa46f67",
      measurementId: "G-47KWTZ6LKT"
    };
  }
  // Provjeriti zasto ga ne vuce - inicijalizcija firebase configuracije
  firebaseService.fBInit(config);
};
