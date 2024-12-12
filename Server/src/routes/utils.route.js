import { Router } from "express";
import { getUpcomingFestivals } from "../controllers/utils.controller.js";
import ProductModel from "../models/product.model.js";
import docsModel from "../models/docs.model.js";

const router = Router();

router.get("/festive_products", async (req, res) => {
    const upcomingFestivals = await getUpcomingFestivals();
    const allFestivals = Object.values(upcomingFestivals)
        .flat()
        .map(festival => festival.name);

    const festiveProducts = await ProductModel.find({
        festivals: { $elemMatch: { $in: allFestivals } }
    });

    res.status(200).json({
        success: true,
        message: "Festive Products fetched successfully",
        data: festiveProducts
      });

});

router.post("/docs", async (req, res) => {
    // get the category from query param, find it in the docsModel and return the data
    const category = req.body.category;
    const docs = await docsModel.findOne({ category });
    res.status(200).json({
        success: true,
        message: "Docs fetched successfully",
        data: docs
      });
});

export default router;