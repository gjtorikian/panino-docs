var _ = require('underscore');

// Returns a modified originalObject that merges in the contents of otherObject.  If no function is specified,
// the value for entries with duplicate keys will be that of other_object.  Otherwise the value for each
// duplicate key is determined by calling the block with the key, its value in originalObject and its value in
// otherObject.
// Ripped from: https://github.com/documentcloud/underscore/pull/551/files
exports.merge = function(originalObject, otherObject, mergeFunction) {
    var originalKeys = _.keys(originalObject);
    var otherKeys = _.keys(otherObject);
    
    _.each(_.without(otherKeys, originalKeys), function(newKey) {
      originalObject[newKey] = otherObject[newKey];
    });
    
    _.each(_.intersection(originalKeys, otherKeys), function(collisionKey) {
      originalObject[collisionKey] = (_.isFunction(mergeFunction)) ? mergeFunction(collisionKey, originalObject[collisionKey], otherObject[collisionKey]) : otherObject[collisionKey];
    });
    
    return originalObject;
};

// yoinked from https://github.com/kmalakoff/underscore-awesomer
exports.findIndex = function(array, fn) {
  var index, value;
  for (index in array) {
    value = array[index];
    if (fn(array[index])) {
      return index;
    }
  }
  return -1;
};