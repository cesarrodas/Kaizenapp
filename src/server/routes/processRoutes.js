import { setConnect } from '../connect-db';
import Process from '../models/processModel'; 
import { authentication, responseHandler } from './authRoutes';

export const processRoutes = (app) => {

  app.get('/api/processes/user/:userId', (req, res) => {
    const userId = req.params.userId;

    setConnect(() => {
      Process.find({ creator: userId }, (err, processes) => {
        if ( err ) { 
          res.status(404);
          responseHandler(req, res, { message: "Processes not found." });
        }

        res.status(200);
        responseHandler(req, res, processes);
      });
    });
  });

  app.get('/api/processes/:id', authentication, (req, res) => {
    const id = req.params.id;

    setConnect(() => {
      Process.findOne({ _id: id }, (err, process) => {
        if ( err ) { 
          res.status(404);
          responseHandler(req, res, { message: "Process not found." });
        }
        
        res.status(200);
        responseHandler(req, res, process);
      });
    });
  });

  app.post('/api/processes/create', (req, res) => {
    const { name, creator } = req.body;

    setConnect(() => {
      const process = new Process({ name: name, creator: creator });
      process.save(function (err, process) {
        if (err) {
          res.status(500);
          responseHandler(req, res, { error: err });
        };
        res.status(201);
        responseHandler(req, res, process);
      });
    });
  });

  app.put('/api/processes/:id', (req, res) => {
    const newProcess = {};
    const id = req.params.id;

    if(req.body.name){
      newProcess.name = req.body.name;
    }

    setConnect(() => {
      Process.findOneAndUpdate({ _id: id }, newProcess, (err, process) => {
        if(err){
          res.status(400);
          responseHandler(req, res, { error: err });
        }
  
        res.status(204);
        responseHandler(req, res, process);
      });
    });
  });

  app.delete('/api/processes/:id', (req, res) => {
    const id = req.params.id;
    
    setConnect(() => {
      Process.findOneAndDelete({ _id: id }, (err) => {
        if(err){
          res.status(500);
          responseHandler(req, res, { error: err });
        }
  
        res.status(200);
        responseHandler(req, res, { message: "Process deleted." });
      });
    });
  });

}