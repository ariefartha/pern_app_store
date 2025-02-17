import express  from "express";
import { createProducts, deleteProducts, getAllProducts, getProducts, updateProducts } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);
router.post("/", createProducts);

export default router