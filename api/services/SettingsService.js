
module.exports = {
	
	// Function to get settings value
	getSettingsValue: function(data, callback) {
		Settings.findOne(data).exec(function(err, setFound){

			if (err) {

				callback(true, err);
			} else {
				
				callback(false, setFound.value);
			}

		});
	}
	
};
