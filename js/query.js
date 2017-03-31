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
        {"$unwind":"$name"},
        {
          $match: { $and : [
            {'name':name}
          ]
        }},
        {"$project": {_id :"$name", "url":"$homepage_url", "code":"$offices.country_code", "staff":"$number_of_employees",
        "founded_year":"$founded_year", "total":{"$sum":"$funding_rounds.raised_amount"}}},
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
        {"$unwind":"$name"},
        {
          $match: { $and : [
            {'category_code':business},
            {'founded_year':{$gte:GTYear}},
            {'founded_year':{$lte:LTyear}}
          ]
        }},
        {"$project": {_id :"$name", "url":"$homepage_url", "code":"$offices.country_code", "staff":"$number_of_employees",
        "founded_year":"$founded_year", "total":{"$sum":"$funding_rounds.raised_amount"}}},
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

module.exports = findData;
