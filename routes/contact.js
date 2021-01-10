//Initialize express router
express = require('express')
router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var db_name = 'madcamp_project2';
var collection_name = 'contacts';

var db = null;
var collection;

router.get('/', function(req, res, next) {
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);
            collection.find({}).toArray(function(err, results){
                res.status(200).json({'Contacts' : results});
              });

            //////////// For DEBUG //////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
            /////////////////////////////

        } 
    });
});

router.post('/',function(req,res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);
            /*collection.find({}).toArray(function(err, results){
                res.status(200).json({'myCollection' : results});
              });*/
            
            if(Object.keys(req.body).length !== 0){
                collection.insert(req.body);
                res.status(200).send({"Message":"success"});
            }
            else{
                res.status(200).send({"Message":"fail"});
            }

            ////////////// For DEBUG ////////////////////
            var cursor = db.collection(collection_name).find();
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
          /////////////////////////////////////////////  
        } 
    });
});

router.put('/',function(req, res){
    mongoClient.connect('mongodb://localhost/', function(error, client){
        if (error) {
            console.log(error);
        } else {
            console.log("connected: " + db_name);
            db = client.db(db_name);

            collection = db.collection(collection_name);
            
            // req.body.phone으로 search 하고 change함.
            var query = {phone:req.body.phone};
            var operator = {name:req.body.changename, email:req.body.changeemail, phone: req.body.changephone};
            var option = {upsert:true};
            collection.update(query,operator,option,function(err,upserted){
                if(err){
                    console.log(err);
                    res.status(200).send({"Message":"fail"});
                }
                else{
                    console.log('updated successfully!');
                    res.status(200).send({"Message":"success"});    
                }
            });

            ////////////// For DEBUG ////////////////////
            var cursor = collection.find({phone:req.body.changephone});
            cursor.each(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (doc != null) {
                        console.log(doc);
                    }
                    else {
                        console.log("END");
                    }
                }
            });
          /////////////////////////////////////////////  
        } 
    });
})

module.exports = router;