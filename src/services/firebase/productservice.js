import baseService from "./base";

const productsCollection = baseService.db().collection("products");
const categoryCollection = baseService.db().collection("categories");

const productByID = async productId => {
  try {
    const product = await productsCollection.doc(productId).get();
    return product;
  } catch (error) {
    console.log("Greska prilikom vracanja proizvoda po ID-u");
    return error;
  }
};

const getProductCategory = async product => {
  try {
    const category = await product.category.get();
    return category.data();
  } catch (error) {
    console.log("Greska prilikom vracanja kategorije proizvoda");
    return error;
  }
};

const getProducts = async (startPage, pageSize, sortString) => {
  try {
    const fbProducts = await productsCollection.get();
  } catch (error) {
    console.log("Greska prilikom dovlacenja proizvoda");
    return error;
  }
};

const getAllCategories = async () => {
  try {
    const fbCategories = await categoryCollection.get();
    let result = [];
    fbCategories.forEach(category => {
      result.push({ id: category.id, name: category.data().name });
    });
    return result;
  } catch (error) {
    console.log("Greska prilikom dovlacenja svih kategorija");
    return error;
  }
};

export { productByID, getProductCategory, getAllCategories };
