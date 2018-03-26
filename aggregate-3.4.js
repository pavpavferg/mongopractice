db.product.aggregate([
    {$match: {
        "_id": "Prod-493875"
    } },
    {$lookup: {
        "from": "classification",
        "as": "_cls",
        "foreignField": "values.MV_S_MASTER．VENDOR",
        "localField": "values.MP_PRIM_VENDOR_ID"
    } },
    {$unwind: {
        path: "$_cls",
        "preserveNullAndEmptyArrays": false
    } },
    {$project: {
        "prod_id": "$_id",
        "name": "$_cls.name",
        "obj_id": "$_cls.objectTypeID"
    } },
    {$match: {
        "obj_id": "Supplier Name"
    } },
    {$lookup: {
        "from": "attribute",
        "as": "_attr",
        "localField": "name",
        "foreignField": "_id"
    } },
    {$unwind: {
        path: "$_attr",
        "preserveNullAndEmptyArrays": false
    } },
    {$project: {
        "product id": "$_id",
        "name": "$name",
        "alias": "$_attr.values.attribute．Alias"
    } }
])

