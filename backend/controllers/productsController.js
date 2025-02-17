import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const product = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All field are required" });
  }

  try {
    const newProduct = await sql`
    INSERT INTO products (name,price,image)
    VALUES (${name},${price},${image})
    RETURNING *
    `;
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const updateProduct = await sql`
    UPDATE products SET name=${name}, price=${price}, image=${image} WHERE id=${id}
    RETURNING *
    `;
    if (updateProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`
        DELETE FROM products WHERE id=${id}
        RETURNING *
        `;
    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`
       SELECT * FROM products WHERE id=${id}
       `;
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
