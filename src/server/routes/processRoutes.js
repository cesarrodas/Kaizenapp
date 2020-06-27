import { setConnect } from '../connect-db';
import Process from '../models/processModel'; 

export const processRoutes = (app) => {

  app.get('/api/processes/user/:id', (req, res) => {

  });

  app.get('/api/processes/:id', (req, res) => {

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

  app.put('/api/processes/update', (req, res) => {

  });

  app.delete('/api/processes/:id', (req, res) => {

  });

}