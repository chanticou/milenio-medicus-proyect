module.exports = {
  getAllProductsQuery: "SELECT * FROM products",
  createProductQuery:
    "INSERT INTO products (name,description,quantity) VALUES (@name, @description, @quantity)",
  getProductbyIdQuery: "SELECT * FROM products WHERE id=@id",
  deleteProductQuery: "DELETE FROM products WHERE id=@id;",
  updateProductQuery: "",
  countProductsQuery: "SELECT COUNT(*) FROM products;",
  updateProductsQuery: `UPDATE products SET name=@name, description=@description, quantity=@quantity WHERE id=@id`,
  dropTableQuery: "DROP TABLE products;",
};
