var _  = require('underscore');
require("colors");

module.exports = function(reportObject, options, callback) {
    _.forEach(reportObject, function(report, className) {
        console.log("For class " + className.cyan + ":");
        if (report.missingMembers === undefined || report.missingMembers.length === 0)
            console.log("Coverage is 100% !!!".green);
        else {
            console.log("Coverage is " + (report.documented / report.missingMembers.length) + "%: ");
            _.each(report.missingMembers, function(missing) {
                console.log(missing);   
            });
        }
    });

    if (callback !== undefined) {
    	callback(err, reportObject);
    }
};