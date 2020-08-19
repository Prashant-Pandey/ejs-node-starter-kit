var Products = require('../models/productsModel');

/**
 * productsController.js
 *
 * @description :: Server-side logic for managing productss.
 */
module.exports = {

    /**
     * productsController.list()
     */
    list: function (req, res) {
        Products.find(function (err, productss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting products.',
                    error: err
                });
            }
            return res.json(productss);
        });
    },

    /**
     * productsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        Products.findOne({_id: id}, function (err, products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting products.',
                    error: err
                });
            }
            if (!products) {
                return res.status(404).json({
                    message: 'No such products'
                });
            }
            return res.json(products);
        });
    },

    /**
     * productsController.create()
     */
    create: function (req, res) {
        var products = new Products({
			discount : req.body.discount,
			name : req.body.name,
			photo : req.body.photo,
			price : req.body.price,
			region : req.body.region

        });

        products.save(function (err, products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating products',
                    error: err
                });
            }
            return res.status(201).json(products);
        });
    },

    /**
     * productsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        Products.findOne({_id: id}, function (err, products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting products',
                    error: err
                });
            }
            if (!products) {
                return res.status(404).json({
                    message: 'No such products'
                });
            }

            products.discount = req.body.discount ? req.body.discount : products.discount;
			products.name = req.body.name ? req.body.name : products.name;
			products.photo = req.body.photo ? req.body.photo : products.photo;
			products.price = req.body.price ? req.body.price : products.price;
			products.region = req.body.region ? req.body.region : products.region;
			
            products.save(function (err, products) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating products.',
                        error: err
                    });
                }

                return res.json(products);
            });
        });
    },

    /**
     * productsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Products.findByIdAndRemove(id, function (err, products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the products.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
