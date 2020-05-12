import baseService from "./base";

const ordersCollection = baseService.db().collection("orders");

//Get users orders
const getUserOrders = async userId => {
  try {
    const orders = await ordersCollection.where("userId", "==", userId).get();
    let result = [];
    orders.forEach(order => {
      result.push({ id: order.id, data: order.data() });
    });
    return result;
  } catch (error) {
    console.log("Greska prilikom dovlacenja svih narudzbina");
    return error;
  }
};

const makeOrder = async order => {
  try {
    await ordersCollection.add(order);
  } catch (error) {
    console.error("Ne pravi narudzbinu");
    console.log(error);
  }
};

export { getUserOrders, makeOrder };
