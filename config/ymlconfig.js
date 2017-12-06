const yaml = require("node-yaml");

var ymldata = yaml.readSync("../setting/config.yml", "utf8", function(err, data){
  if(err){
    console.log(err);
  }
  else{
    console.log(data);
  }
});

module.exports = ymldata;
