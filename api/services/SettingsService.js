
module.exports = {
    // Function to get settings value
    getSettingsValue: function (callback) {

        //Settings.findOne(data).exec(function(err, result){
        var query = "SELECT * FROM settings";
        Settings.query(query, function (err, result) {
            if (err) {

                callback(true, err);
            }
            else {
                var count = 0;
                var keyArray = [];
                var valueArray = [];
                result.forEach(function (factor, index) {

                    count++;
                    keyArray.push(factor.key);
                    valueArray.push(factor.value);
                });

                var keyValue = [],
                        i,
                        keys = keyArray,
                        values = valueArray;
                //Merge 2 arrays
                for (i = 0; i < keys.length; i++) {
                    keyValue[keys[i]] = values[i];
                }

                callback(false, keyValue);
            }

        });
    }

};
