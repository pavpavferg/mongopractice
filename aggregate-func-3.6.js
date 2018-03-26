f = function(x) {
    return db.product.aggregate([
        {$match: {
            "_id": x
        } },
        {$lookup: {
            "from": "classification",
            "as": "_cls",
            "let": {
                "vendor_id": "$values.MP_PRIM_VENDOR_ID",
            },
            pipeline: [
                { $match: {
                    $expr: {
                        $eq: ["$objectTypeID", "Supplier Name"]
                    },
                    $expr: {
                        $eq: ["$values.MV_S_MASTER．VENDOR", "$$vendor_id"]
                    }
                } },
                { $project: {
                    _id: "$$vendor_id",
                    "name": "$name"
                } }
            ]
        } },
        {$unwind: {
            path: "$_cls",
            "preserveNullAndEmptyArrays": false
        } },
        {$lookup: {
            "from": "attribute",
            "as": "_attr",
            "let": {
                "name": "$_cls.name",
            },
            pipeline: [
                { $match: {
                    $expr: {
                        $eq: ["$_id", "$$name"]
                    }
                } },
                { $project: {
                    "alias": "$values.attribute．Alias"
                } }
            ]
        } },
        {$unwind: {
            path: "$_attr",
            "preserveNullAndEmptyArrays": false
        } },
        {$project: {
            "product id": "$_id",
            "name": "$_cls.name",
            "alias": "$_attr.alias"
        } }
    ])
}

print(x)
f(x).forEach(function(doc) {
    print(JSON.stringify(doc, null, 3));
});

