import baseService from "./base";

const cartservice = baseService.db().collection("cart");

//Get users cart
const getUsersCart = userId => {
  const cart = cartservice.where("userId", "==", userId).get();
  // TODO: Zavrsiti nakon profilne stranice
};
