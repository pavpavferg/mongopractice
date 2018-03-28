# MongoDB Examples
## Aggregation Framework
### aggregate-3.6.js
Find by product.id = "Prod-493875" using `$expr` to retrieve selected fields from classification and attribute collections.

```
mongo DEV_EN_All_All --quiet < aggregate-3.6.js
```

### aggregate-func-3.6.js
Make the aggregate command a function and pass variable as a `--eval` parameter.

```
mongo DEV_EN_All_All --quiet --eval 'var x="Prod-3759305";' aggregate-func-3.6.js
```

## tree.py
Results varied depending on the connectivity speed between the script (this) and MongoDB instances.  It is recommended to execute the script on a server located in the same region as the MongoDB Atlas instances.
 
### Usage
```
./tree.py [mongo connection uri]
```
Default *mongo connection uri* is `mongodb://localhost:27017/test?replicaSet=replset` if not included.

### Index
Apply the index below.

```
db.classification.createIndex({ objectTypeID: 1, parentID: 1})
```

### Output
A "tree" document is written to collection `class_tree_docs` and sample stdout outputs are as follows.

```
2018-03-28 09:53:07.903664

FOL Version 2.0 (Ferguson.com)
+--webfolder2-0 (MDM Taxonomy)
|  +--webfolder2-10 (Heating & Cooling)
|  |  +--webfolder2-201 (HVAC Installation Supplies)
|  |  |  +--webfolder2-2879 (Filter Racks & Cabinets)
|  |  |  +--webfolder2-995 (Line Sets)
|  |  |  +--webfolder2-986 (Condenser Brackets)
|  |  |  +--webfolder2-2673 (Condensate)
|  |  |  |  +--webfolder2-2677 (HVAC Flood Detectors)
|  |  |  |  +--webfolder2-2989 (Collector Boxes)
|  |  |  |  +--webfolder2-2676 (Condensate Traps)
|  |  |  |  +--webfolder2-2678 (Vinyl HVAC Tubing)
|  |  |  |  +--webfolder2-2674 (Condensate Drain Pans)
|  |  |  +--webfolder2-991 (HVAC Electrical)
|  |  |  |  +--webfolder2-1704 (HVAC Power Supply)
|  |  |  |  +--webfolder2-2679 (Whips)
... <more>
|  |  |  +--webfolder2-1091 (Sprinkler Elbows)
|  |  +--webfolder2-241 (Fire Hose & Accessories)
|  |  +--webfolder2-242 (Sprinkler Controls, Sensors, Alarms & Parts)
|  |  +--webfolder2-2874 (Nozzles)
|  |  +--webfolder2-244 (Sprinkler Heads)
|  |  +--webfolder2-245 (Sprinkler Pipe)
|  |  +--webfolder2-240 (Chemicals)
|  |  +--webfolder2-2651 (Sprinkler Valves)
|  +--webfolder2-3328 (Agricultural Products)
|  |  +--webfolder2-3327 (Agricultural Accessories)
|  |  +--webfolder2-3330 (Agricultural Water Heaters)
|  |  +--webfolder2-3329 (Agricultural Valves & Parts)
|  |  +--webfolder2-168 (Agricultural Dispensers)

 - built classification tree took 1152 ms
 - saved doc to class_tree_docs took 132 ms
 - total number of queries 2564
```

## Change Streams
This example watches changes from the *product* collection.  Upon rereceiving an event, its posts `product._id` to a [MQTT server](https://test.mosquitto.org/).  The MQTT client is from [Eclipse Paho™ MQTT Python Client](https://github.com/eclipse/paho.mqtt.python).

### Files

- cs_watch.py - MongoDB change streams example in Python
- cs_watch.js - MongoDB change streams example in Node.js
- mqtt_listener.py - MQTT listener example
- cs_sim.js - simulation file

### Execution
#### Start Change Stream using Python

```
./cs_watch.py [mongo connection uri]
```

#### Start Change Stream using Node.js
```
npm install mongodb --save
npm install ascoltatori --save
node ./cs_watch.js
```

#### Start MQTT Listener
```
./mqtt_listener.py
```

#### Run simulater
Assuming `mongod` replica set instances are up and running.

```
mongo --quiet mongodb://localhost/DEV_EN_All_All?replicaSet=replset < cs_sim.js
```

