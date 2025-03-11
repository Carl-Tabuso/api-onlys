import Product from "../models/product.js";
import _ from "lodash";

const index = async (req, res, next) => {
    const products = await Product.find();
    const { min_price: range, min_stock: minStock } = req.query;
    if (! _.isEmpty(range) && ! _.isEmpty(minStock)) {
        const filteredProducts = products.filter((product) => {
            return product.price <= Number(range) && product.remaining >= Number(minStock);
        });
        return res.status(200).json({
            data: {
                products: filteredProducts,
            }
        })
    }
    if (! _.isEmpty(range)) {
        const inRange = products.filter((product) => product.price <= Number(range));
        return res.status(200).json({
            data: {
                products: inRange,
            }
        })
    }
    if (! _.isEmpty(minStock)) {
        const inStocks = products.filter((product) => product.remaining >= Number(minStock));
        return res.status(200).json({
            data: {
                products: inStocks,
            }
        })
    }
    return res.status(200).json({ data: { products: products } });
}

const show = async (req, res, next) => {
    const { id: productId } = req.params;
    const product = await Product.find({ _id: productId });
    if (! product) {
        return res.status(404).json({ message: `Product not found.` });
    }
    return res.status(200).json({
        data: {
            success: true,
            product: product
        }
    });
}

const store = async (req, res, next) => {
    await Product.create(req.body);
    return res.status(201).json({
        data: {
            success: true,
            message: "Created successfully.",
        }
    });
}

const update = async (req, res, next) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (! product) {
        return res.status(404).json({ message: `Product Id: ${productId} not found.` });
    }
    return res.status(200).json({
        data: {
            success: true,
            message: `Product Id: ${productId} updated successfully.`,
        }
    });
}

const destroy = async (req, res, next) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId });
    if (! product) {
        return res.status(404).json({ message: `Product Id: ${productId} not found.` });
    }
    console.log(productId);
    return res.json({ message: "Deleted successfully" }).status(204);
}

export const productController = { index, show, store, update, destroy };