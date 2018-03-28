var ascoltatori = require('ascoltatori');

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const pipeline = [
];

settings = {
    type: 'mqtt',
    json: false,
    mqtt: require('mqtt'),
    url: 'mqtt://test.mosquitto.org:1883'
};

ascoltatori.build(settings, function (err, ascoltatore) {
    MongoClient.connect("mongodb://localhost:27017/test?replicaSet=replset")
        .then(client => {
            console.log("Connected correctly to server");
            // specify db and collections
            const db = client.db("DEV_EN_All_All");
            const collection = db.collection("product");
            const changeStream = collection.watch(pipeline);
    
            changeStream.on("change", function(change) {
                // publishes a message to the topic 'hello'
                payload = JSON.stringify({_id: change.documentKey._id, op: change.operationType, lang: "js"});
                console.log(payload);
                ascoltatore.publish('ferguson/test/single', payload, function() {
            });
        }); })
        .catch(err => {
        console.error(err);
    });
});

