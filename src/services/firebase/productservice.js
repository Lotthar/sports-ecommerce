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

const categoryByID = async categoryId => {
  try {
    const category = await categoryCollection.doc(categoryId + "").get();
    return category;
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

const getAllProducts = async () => {
  try {
    const fbProducts = await productsCollection.get();
    let result = [];
    fbProducts.forEach(product => {
      result.push({ id: product.id, data: product.data() });
    });
    return result;
  } catch (error) {
    console.log("Greska prilikom dovlacenja svih proizvoda");
    return error;
  }
};

// Gets filtered products by category and section
const getFilteredProducts = async (category, section, search) => {
  let query;
  try {
    if (section) {
      query = productsCollection.where("section", "==", section);
    }
    if (category) {
      if (query) {
        query = query.where("category", "==", parseInt(category));
      } else {
        query = productsCollection.where("category", "==", parseInt(category));
      }
    }
    const result = [];
    let productsGet;
    if (query) {
      productsGet = await query.get();
    } else {
      productsGet = await productsCollection.get();
    }
    productsGet.forEach(product => {
      let newObj = { id: product.id, data: product.data() };
      if (search) {
        // Trazimo proizvode koji sadrze u imenu i nazivu unesene podatke
        let nameProd = newObj.data.name;
        let descriptionProd = newObj.data.description;
        if (
          nameProd.toLowerCase().includes(search.toLowerCase()) ||
          descriptionProd.toLowerCase().includes(search.toLowerCase())
        ) {
          result.push(newObj);
        }
      } else {
        result.push(newObj);
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
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

export {
  productByID,
  getProductCategory,
  getAllCategories,
  getAllProducts,
  getFilteredProducts,
  categoryByID
};
