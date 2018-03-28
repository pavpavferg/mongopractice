#! /usr/bin/env python
# cs_watch.py
# Author: Ken Chen
#   3/28/2018 - first created
#

import json
import paho.mqtt.publish as publish
import pymongo
from pymongo import MongoClient
import sys
import time

client = None
db = None
collection = None

def init(mongo_uri):
    global client
    global db
    global collection
    client = MongoClient(mongo_uri)
    db = client.DEV_EN_All_All
    collection = db.product

if __name__ == "__main__":
    mongo_uri = 'mongodb://localhost:27017/test?replicaSet=replset'
    if len(sys.argv) > 1:
        mongo_uri = sys.argv[1]
    init(mongo_uri)
    try:
        for change in collection.watch():
            # print("_id: %s %s" + change['documentKey']['_id'], change['operationType'])
            doc = {"op": change['operationType'], "_id":  change['documentKey']['_id'], "lang": "py"}
            payload = json.dumps(doc)
            print(payload)
            publish.single("ferguson/test/single", payload, hostname="test.mosquitto.org")
    except pymongo.errors.PyMongoError:
        console.log("error")
        pass

