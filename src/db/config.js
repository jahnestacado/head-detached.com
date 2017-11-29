var mongoskin = require("mongoskin");
var mongoClient = mongoskin.MongoClient;
var mongoURI = process.env.MONGO_URI || "localhost:27017";
var _ = require("underscore");
var COLLECTIONS = ["blog", "users"];
var bus = require("hermes-bus");
var bcrypt = require("bcrypt");

var SUPER_ADMIN_DEFAULT_CREDENTIALS = {
    username: "super-admin",
    password: bcrypt.hashSync("admin", 15)
};


var initializeAdminUser = function(db, onDone, onError){
    var usersCollection = db.collection("users");
    usersCollection.findOne({username: SUPER_ADMIN_DEFAULT_CREDENTIALS.username}, function(error, results) {
        if(error) {
            onError(error);
        } else if(results === null) {
            usersCollection.insert(SUPER_ADMIN_DEFAULT_CREDENTIALS, function(error, results) {
                error ? onError(error) : onDone();
            });
        }
    });
};

var initializeCollections = function(db, onDone, onError) {
    db.collections(function(error, collections) {
        if (error) {
            onError(error);
        } else {
            var existingCollections = collections.map(function(collection) {
                return collection.collectionName;
            });

            console.log("Connected", existingCollections);
            COLLECTIONS.forEach(function(collectionName) {
                if (!_.contains(existingCollections, collectionName)) {
                    db.createCollection(collectionName, function(error) {
                        if (error) {
                            onError(error);
                        } else {
                            console.log(
                                "Collection: " +
                                    collectionName +
                                    " successfully initialized!!!"
                            );
                            initializeAdminUser(db, function(){
                                console.log("Created user " + SUPER_ADMIN_DEFAULT_CREDENTIALS.username);
                            },onError);
                        }
                    });
                }
            });
            onDone();
        }
    });
};

var connect = function(onError) {
    var db;
    db = mongoClient.connect("mongodb://" + mongoURI + "/mywebsite");
    initializeCollections(
        db,
        function() {
            bus.db.triggerDatabaseReady(db);
        },
        onError
    );
};

var connectWithRetry = function() {
    connect(function(error) {
        console.error(error);
        setTimeout(connectWithRetry, 10000);
    });
};

connectWithRetry(10000);
