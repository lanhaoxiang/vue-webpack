var fs=require('fs');
var path=require('path');

/**
 * load entries from dir with format{ foo:'bar/main.js'}
 * warning: please notice that the name of mian.js is important
 * @param dir
 * @param entries
 * @returns {*|Array}
 */
function loadEntries (dir){
  var files = fs.readdirSync(dir);
  var entries ={};
  files.forEach((filename) => {
    var filePath = path.join(dir, filename);
    if (fs.statSync(filePath).isDirectory()) {
      entries[filename]=filePath+'/main.js';
    }
  });
  return entries;
};

module.exports=loadEntries;
