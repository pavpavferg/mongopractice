db.product.aggregate([
    {$match: {
        "_id": "Prod-493875"
    } },
    {$lookup: {
        "from": "classification",
        "as": "_cls",
        "let": {
            "vendor_id": "$values.MP_PRIM_VENDOR_ID"
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
                "name": "$name"
            } }
        ]
    } },
    {$unwind: {
        path: "$_cls",
        "preserveNullAndEmptyArrays": true
    } },
    {$lookup: {
        "from": "attribute",
        "as": "_attr",
        pipeline: [
            { $match: {
                "_id": "PW_CURRENT_PRICE"
            } },
            { $project: {
                "alias": "$values.attribute．Alias"
            } }
        ]
    } },
    {$unwind: {
        path: "$_attr",
        "preserveNullAndEmptyArrays": true
    } },
    {$project: {
        "_id": 0,
        "product id": "$_id",
        "name": "$_cls.name",
        "alias": "$_attr.alias",
        "price": "$values.PW_CURRENT_PRICE"
    } }
])

