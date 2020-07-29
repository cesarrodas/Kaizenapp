export const sureThing = (promise, message = { success: "success", rejected: "rejected" }) => 
  promise.then(result => ({ ok: true, result, message: message.success }))
  .catch(error => Promise.resolve({ ok: false, error, message: message.rejected }));

export const responseHandler = (req, res, data) => {
  if(req.token){
    res.send({ data: data, token: req.token });
  } else {
    res.send({ data: data });
  }
}

export const responseFinalizer = (req, res, data) => {
  if(req.token){
    data.token = req.token;
    res.send(data);
  } else {
    res.send(data);
  }
}