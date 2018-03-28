#! /usr/bin/env python
# tree.py
# Author: Ken Chen
#   3/28/2018 - first created
#

import datetime
import pprint
import pymongo
from pymongo import MongoClient
import sys
import time

client = None
db = None
collection = None
count = 0

root_id = "FOL Version 2.0"
tree_doc = {}

'''
init global variables and mongo connection
'''
def init(mongo_uri):
    global client
    global db
    global collection
    client = MongoClient(mongo_uri)
    db = client.DEV_EN_All_All
    collection = db.classification

'''
recursive function to retrieve child nodes
'''
def getChildNodes(document, level):
    parent_id = document['_id']
    child = document['children']
    global count
    count = count + 1

    '''
    make sure index exist { objectTypeID: 1, parentID: 1 }
    '''
    docs = list(collection.find({ "objectTypeID": "FOL Folder", "parentID": parent_id }))

    if docs is None or len(docs) == 0:
        return

    # pprint.pprint(docs)
    for doc in docs:
        doc["children"] = []
        child.append(doc)
        for i in range(0, level):
            sys.stdout.write('|  ')
        sys.stdout.write('+--')
        print("%s (%s)" % (doc["_id"], doc["name"]))
        getChildNodes(doc, level + 1)

'''
build document tree
'''
def build_tree():
    print datetime.datetime.now()
    global count
    t0 = int(round(time.time() * 1000))
    tree_doc = collection.find_one({ "_id": root_id })
    tree_doc["children"] = []
    print("\n%s (%s)" % (tree_doc["_id"], tree_doc["name"]))
    getChildNodes(tree_doc, 0)
    t1 = int(round(time.time() * 1000))
    print('\n - built classification tree took %d ms' % (t1-t0))
    db.class_tree_docs.save(tree_doc)
    t2 = int(round(time.time() * 1000))
    print(' - saved doc to %s took %d ms' % ("class_tree_docs", (t2-t1)))
    print " - total number of queries %d" % count
    count = 0

if __name__ == "__main__":
    mongo_uri = 'mongodb://localhost:27017/test?replicaSet=replset'
    if len(sys.argv) > 1:
        mongo_uri = sys.argv[1]
    init(mongo_uri)
    tree_doc = db.class_tree_docs.find_one({ "_id": root_id })
    build_tree()

