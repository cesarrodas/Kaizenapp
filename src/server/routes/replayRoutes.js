import { setConnect } from '../connect-db';
import Replay from '../models/replayModel'; 
import { responseHandler } from './authRoutes';

export const replayRoutes = (app) => {

  app.get('/api/replays/process/:id', (req, res) => {
    const id = req.params.id;

    setConnect(() => {
      Replay.find({ process: id }, (err, replays) => {
        if (err) {
          res.status(404);
          responseHandler(req, res, { message: "Replays not found." });
        }

        res.status(200);
        responseHandler(req, res, replays);
      });
    });
  });

  app.get('/api/replay/:id', (req, res) => {
    const id = req.params.id;

    setConnect(() => {
      Replay.findOne({ _id: id }, (err, replay) => {
        if ( err ) { 
          res.status(404);
          responseHandler(req, res, { message: "Replay not found." });
        }
  
        res.status(200);
        responseHandler(req, res, replay);
      })
    });
  });
  
  app.post('/api/replay/create', (req, res) => {
    const { name, detail, process, creator } = req.body;
 
    setConnect(() => {
      const newReplay = new Replay({ name: name, detail: detail, process: process, creator: creator });
      newReplay.save(function (err, newReplay) {
        if (err) {
          res.status(500);
          responseHandler(req, res, { error: err });
        };
        res.status(201);
        responseHandler(req, res, newReplay);
      });
    });
  });

  app.put('/api/replay/:id', (req, res) => {
    const newReplay = {};
    const id = req.params.id;

    if(req.body.name){
      newReplay.name = req.body.name;
    }

    if(req.body.detail){
      newReplay.detail = req.body.detail;
    }

    if(req.body.process){
      newReplay.process = req.body.process;
    }

    setConnect(() => {
      Replay.findOneAndUpdate({ _id: id }, newReplay, (err, replay) => {
        if(err){
          res.status(400);
          responseHandler(req, res, { error: err });
        }
  
        res.status(204);
        responseHandler(req, res, replay);
      });
    });
  });

  app.delete('/api/replay/:id', (req, res) => {
    const id = req.params.id;

    setConnect(() => {
      Replay.findOneAndDelete({ _id: id }, (err) => {
        if(err){
          res.status(500);
          responseHandler(req, res, { error: err });
        }
  
        res.status(200);
        responseHandler(req, res, { message: "Replay deleted." });
      });
    });
  });
}