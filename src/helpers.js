export const sureThing = (promise, message = { success: "success", rejected: "rejected" }) => 
  promise.then(result => result ? ({ ok: true, result, message: message.success }) : ({ ok: false, result, message: message.rejected }))
  .catch(error => Promise.resolve({ ok: false, error, message: message.rejected }));

export const responseHandler = (req, res, data) => {
  if(req.token){
    res.send({ data: data, token: req.token });
  } else {
    res.send({ data: data });
  }
}

export const filterObject = (keysToRemove, object) => {
	let newObject = {};
  	let keys = Object.keys(object);
  	for(let i = 0; i < keys.length; i++){
    	if(keysToRemove.indexOf(keys[i]) == -1){
        	newObject[keys[i]] = object[keys[i]];		                             
        }
    }
	return newObject;
}

export const responseFinalizer = (req, res, data) => {
  res.send(data);
}