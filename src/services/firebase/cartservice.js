import baseService from "./base";

const cartCollection = baseService.db().collection("cart");

//Get users cart
const getUsersCart = async userId => {
  try {
    const cart = await cartCollection.doc(userId).get();
    return { id: cart.id, data: cart.data() };
  } catch (error) {
    console.log("Greska prilikom dovlacenja korpe");
    return error;
  }
};
// Ukoliko korisnik jos uvijek nema korpu
const makeNewCart = () => {};

export { getUsersCart };
