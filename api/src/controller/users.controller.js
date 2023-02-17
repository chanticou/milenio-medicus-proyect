const getConnection = require("../database/connection");
const sql = require("mssql");
const querys = require("../database/querys");

const getAllProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllProductsQuery);
    res.status(200).json({ message: "Succes", payload: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description } = req.body;
  let { quantity } = req.body;
  if ((!name, !description)) throw new Error("Data missing");
  if (!quantity) quantity = 0;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("image", sql.Int, quantity)

      .query(querys.createProductQuery);

    res.json({ message: "Product created", payload: req.body });
  } catch (err) {
    res.send(err.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("Theres no id");
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(querys.getProductbyIdQuery);

    res.status(200).json({ message: "Succes", payload: result.recordset[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("Theres no id");
    const pool = await getConnection();
    await pool.request().input("id", id).query(querys.deleteProductQuery);

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.send(err.message);
  }
};

const updateProduct = async (req, res) => {
  const { name, description, quantity } = req.body;
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("description", sql.Text, description)
      .input("quantity", sql.Int, quantity)
      .input("id", sql.Int, id)
      .query(querys.updateProductsQuery);
    console.log(result);
    res.status(200).json({ message: "product updated", payload: req.body });
  } catch (err) {
    res.send(err.message);
  }
};

const countProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.countProductsQuery);

    res.status(200).json({ payload: result.recordset[0][""] });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  updateProduct,
  deleteProduct,
  createProduct,
  getProductById,
  getAllProducts,
  countProducts,
};
