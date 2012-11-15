var _  = require('underscore');
require("colors");

module.exports = function(reportObject) {
    _.forEach(reportObject, function(report, className) {
        if (report.missingMembers === undefined || report.missingMembers.length === 0)
            console.log(className.cyan + ": " + "coverage is 100% !!!".green);
        else {
            var percentage = ((report.documented / report.missingMembers.length) * 100).toFixed(2);
            console.log(className.cyan + ": " + "coverage is " + report.documented + " / " + report.missingMembers.length + " (" + (percentage >= 80 ? (percentage + "%").yellow : (percentage + "%").red) + "): ");
            _.each(report.missingMembers, function(missing) {
                console.log(missing);   
            });
        }
    });
};