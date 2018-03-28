for (i = 0; i < 3; i++) {
	var id = "Ferguson-long-ID-" + Math.round(Math.random()*1000000)
    print("Making changes on _id " + id);
	db.product.remove({ _id: id });
	db.product.insert({ _id: id, counter: 1});
	db.product.save({ _id: id, counter: 10});
	db.product.update({ _id: id }, {$inc: {count: 100}});
	db.product.remove({ _id: id });
}
