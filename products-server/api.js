function api (app) {
    var mongojs = require("mongojs");
    
    var db = mongojs("productsDB", ["products"]);

    app.get("/api/products", function (request, response) {
        var pageSize = request.query.pageSize ? parseInt(request.query.pageSize) : 100;

        var find = {};

        var result = db.products.find(find).limit(pageSize, function (err, docs) {
            response.json(docs);
        });
    });

    app.get("/api/product/:id", function (request, response) {
        var id = request.params.id;

        db.products.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });

    app.post("/api/product", function (request, response) {
        console.log(request);
        console.log(request.body);
        db.products.insert(request.body, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });

    app.put("/api/product/:id", function (request, response) {
        var id = request.params.id;

        db.products.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    firstName: request.body.firstName,
                    middleName: request.body.middleName,
                    lastName: request.body.lastName,
                    phone: request.body.phone,
                    email: request.body.email
                }
            },
            new: true
        }, function (err, doc) {
            response.json(doc);
        });
    });

    app.delete("/api/product/:id", function (request, response) {
        var id = request.params.id;

        console.log(id);

        db.products.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });
};

module.exports = api;
