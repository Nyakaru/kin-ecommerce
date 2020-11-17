//@ts-check
// methods for routes
import paginate from "jw-paginate"

import {
  products,
  getProductById,
  addProduct,
  removeProduct,
  editProduct,
} from "./db";

/**
 * @param {{ body: { name: any; price: any; description: any; vendor: any; }; file: { path: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: boolean; data?: import("mongoose").Document; error?: any; }): void; new (): any; }; }; }} res
 */
const createProduct = async (req, res) => {
  try {
    let payload = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
      description: req.body.description,
      vendor: req.body.vendor,
    };
    let product = await addProduct({
      ...payload,
    });
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

/**
 * @param {any} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: boolean; data?: import("mongoose").Document[]; error?: any; }): void; new (): any; }; }; }} res
 */
const getProducts = async (req, res) => {
  try {
    let data = await products();
    const items = [...Array(data?.length).keys()];
     // get page from query params or default to first page
     const page = parseInt(req.query.page) || 1;
     // get pager object for specified page or default to five
     const pageSize = parseInt(req.query.pageSize) || 5;
     const pager = paginate(items.length, page, pageSize);
     // get page of items from items array
     const pageOfItems = data.slice(pager.startIndex, pager.endIndex + 1);
    res.status(200).json({
      status: true,
      data: pageOfItems,
      // @ts-ignore
      totalItems: pager.totalItems,
      currentPage: pager.currentPage,
      pageSize: pager.pageSize,
      totalPages: pager.totalPages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

/**
 * @param {{ params: { id: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: boolean; data?: import("mongoose").Document; error?: any; }): void; new (): any; }; }; }} res
 */
const getSingleProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let productDetails = await getProductById(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

/**
 * @param {{ params: { id: any; }; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: boolean; data?: import("mongoose").Document; error?: any; }): void; new (): any; }; }; }} res
 */
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let productDetails = await removeProduct(id);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

/**
 * @param {{ params: { id: any; }; body: any; }} req
 * @param {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: boolean; data?: any; error?: any; }): void; new (): any; }; }; }} res
 */
const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let updateOps = {};
    for (const [key, value] of Object.entries(req.body)) {
      updateOps[key] = value;
    }
    let productDetails = await editProduct(id, updateOps);
    res.status(200).json({
      status: true,
      data: productDetails,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

export {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
