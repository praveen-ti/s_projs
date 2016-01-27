/**
 * AdpositionController
 *
 * @description :: Server-side logic for managing adpositions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

/*===================================================================================================================================
                                                   Create an AdPosition
 ====================================================================================================================================*/


    createAdPosition : function(req, res) {

         AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                 var values = {
                                                name                  :       req.body.name,
                                                description           :       req.body.description,
                                                cost                  :       req.body.cost,
                                              };
                                 Adposition.create(values).exec(function(err, result){
                                        if (err)
                                        {
                                            return res.json(200, {status: 2, message: 'Some error occured', errorDetails: err});
                                        } else
                                        {
                                            console.log(result);
                                            return res.json(200, {status: 1, message: 'success', result: result});
                                        }
                                    });
                            }
                            else
                            {
                                return res.json(200, {status: 3, message: 'token expired'});
                            }
                   }
         });
    },


/*===================================================================================================================================
                                                      Edit AdPosition
 ====================================================================================================================================*/


    updateAdPosition : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {
                        //Assigning value to authorId
                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                         if(tokenCheck.status == 1)
                            {

                var adPositionDetails = '{"adPositionDetails" : {"id":'+req.body.adPositionId+', "name": "'+req.body.name+'", "description": "'+req.body.description+'", "cost": '+req.body.cost+'}}';
                 console.log(adPositionDetails);
                var jsonAdPositionDetails = JSON.parse(adPositionDetails);

                console.log(jsonAdPositionDetails);
                console.log(tokenCheck.tokenDetails.adminId);

                                Adposition.findOne({id: jsonAdPositionDetails.adPositionDetails.id}).exec(function findCB(err, result) {
                                    if(err)
                                    {
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                        console.log(result);
                                        var values = {
                                                       name                 :       jsonAdPositionDetails.adPositionDetails.name,
                                                       description          :       jsonAdPositionDetails.adPositionDetails.description,
                                                       cost                 :       jsonAdPositionDetails.adPositionDetails.cost,
                                                      };
                                        //return res.json(200, {status: 1, message: 'success'});
                                        var criteria = {id: result.id};
                                        Adposition.update(criteria, values).exec(function(err, updatedAdPosition) {
                                            if(err)
                                            {
                                                return res.json(200, {status: 2, error_details: err});
                                            }
                                            else
                                            {
                                                return res.json(200, {status: 1, updatedAdPosition: updatedAdPosition});
                                            }

                                        });
                                    }
                                  });
                            }
                            else
                            {
                                return res.json(200, {status: 3, message: 'token expired'});
                            }

                 }
          });
    },



/*===================================================================================================================================
                                                   Delete an AdPosition
 ====================================================================================================================================*/

 deleteAdPosition : function(req, res) {


          AdmintokenService.checkToken(req.body.token, function(err, tokenCheck) {

                    if(err)
                    {
                         return res.json(200, {status: 2, message: 'some error occured', error_details: tokenCheck});
                    }
                    else
                    {
                        if(tokenCheck.status == 1)
                            {
                                Adposition.destroy({id: req.body.adPositionId}).exec(function deleteCB(err){
                                    if(err)
                                    {
                                        console.log("error");
                                        return res.json(200, {status: 2, error_details: err});
                                    }
                                    else
                                    {
                                         console.log("Succes");
                                         return res.json(200, {status: 1, message: 'success'});
                                    }

                                });
                            }
                            else
                            {
                                return res.json(200, {status: 3, message: 'token expired'});
                            }
                    }
        });
    },


};

