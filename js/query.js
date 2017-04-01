var MongoClient = require('mongodb').MongoClient;

var findData = function(data, callback){

  MongoClient.connect("mongodb://localhost:27017/COMPANIES", function(err, db) {
    var collection = db.collection('companies');

    var name = data.name;
    var business = data.business;
    var LTyear = parseInt(data.LTyear);
    var GTYear = parseInt(data.GTYear);
    var GTMoney = parseInt(data.GTMoney);
    var LTMoney = parseInt(data.LTMoney);

    if(name != ""){

      collection.aggregate([
        {"$unwind":"$obj.name"},
        {
          $match: { $and : [
            {'obj.name':name}
          ]
        }},
        {"$project": {_id :"$obj.name", "url":"$obj.homepage_url", "code":"$obj.offices.country_code", "staff":"$obj.number_of_employees",
        "founded_year":"$obj.founded_year", "total":{"$sum":"$obj.funding_rounds.raised_amount"}}},
        {"$sort" : {"total" : -1}}
      ]).toArray(function (error, results){
        var i = 0;
        for(var i in results){
          console.log(results[i]);
        }
        callback && callback(results);
        console.log('query executed');
      });
    }
    else {
      collection.aggregate([
        {"$unwind":"$obj.name"},
        {
          $match: { $and : [
            {'obj.category_code':business},
            {'obj.founded_year':{$gte:GTYear}},
            {'obj.founded_year':{$lte:LTyear}}
          ]
        }},
        {"$project": {_id :"$obj.name", "url":"$obj.homepage_url", "code":"$obj.offices.country_code", "staff":"$obj.number_of_employees",
        "founded_year":"$obj.founded_year", "total":{"$sum":"$obj.funding_rounds.raised_amount"}}},
        {"$sort" : {"total" : -1}},
        {$match: { $and : [ {'total': {$gte : GTMoney}}, {'total': {$lte : LTMoney}} ] }}
      ]).toArray(function (error, results){
        var i = 0;
        for(var i in results){
          console.log(results[i]);
        }
        callback && callback(results);
        console.log('query executed');
      });
    }

  });
}

var insert = function(arr){
  MongoClient.connect("mongodb://localhost:27017/COMPANIES", function(err, db) {
    var collection = db.collection('companies');
    for(var i = 0; i < arr.length - 1; i++){
      var data = arr[i];
      var obj = JSON.parse(data);
      collection.insertOne({
        obj
      }, function(err, result) {
        if(err) throw err;
      });
      console.log("insertion done");
    }

  });
}

module.exports.findData = findData;
module.exports.insert = insert;
