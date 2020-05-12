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
const makeNewCart = async userId => {
  const cart = {
    products: [],
    total: 0
  };
  try {
    const newCart = await cartCollection.doc(userId).set({ ...cart });
    console.log("Created user cart successfuly in firebase");
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

const updateCart = async payload => {
  try {
    await cartCollection.doc(payload.id).update(payload.updates);
    console.log("Updated cart successfuly in firebase");
  } catch (error) {
    console.error("Error updating cart in firebase", error);
  }
};

export { getUsersCart, updateCart, makeNewCart };
