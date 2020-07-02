import { setConnect } from '../connect-db';
import Process from '../models/processModel'; 
import { authentication } from './authRoutes';

export const processRoutes = (app) => {

  app.get('/api/processes/user/:userId', (req, res) => {
    const userId = req.params.userId;

    setConnect(() => {
      Process.find({ creator: userId }, (err, processes) => {
        if ( err ) { 
          res.status(404);
          res.send({ message: "Processes not found." });
        }

        res.status(200);
        res.send(processes);
      });
    });
  });

  app.get('/api/processes/:id', authentication, (req, res) => {
    const id = req.params.id;

    setConnect(() => {
      Process.findOne({ _id: id }, (err, process) => {
        if ( err ) { 
          res.status(404);
          res.send({ message: "Process not found." });
        }
  
        res.status(200);
        res.send(process);
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
          res.send({"error": err});
        };
        res.status(201);
        res.send(process);
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
          res.send({"error": err});
        }
  
        res.status(204);
        res.send(process);
      });
    });
  });

  app.delete('/api/processes/:id', (req, res) => {
    const id = req.params.id;
    
    setConnect(() => {
      Process.findOneAndDelete({ _id: id }, (err) => {
        if(err){
          res.status(500);
          res.send({ "error": err });
        }
  
        res.status(200);
        res.send({"message": "Process deleted."});
      });
    });
  });

}