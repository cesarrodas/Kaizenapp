import Replay from '../models/replayModel';
import { sureThing, responseFinalizer } from '../../helpers';

export const replayRoutes = (app) => {

  app.get('/api/replays/process/:id', async (req, res) => {
    const id = req.params.id;

    const replays = await sureThing(Replay.find({ process: id }).exec(), {
      success: 'success',
      rejected: 'The replays were not found.'
    });

    if(!replays.ok) {
      res.status(404)
      responseFinalizer(req, res, replays);
    }

    res.status(200);
    responseFinalizer(req, res, replays);

  });

  app.get('/api/replay/:id', async (req, res) => {
    const id = req.params.id;

    const foundReplay = await sureThing(Replay.findOne({ _id: id }).exec(), {
      success: 'success',
      rejected: 'The replay was not found.'
    });

    if(!foundReplay.ok){
      res.status(404);
      responseFinalizer(req, res, foundReplay);
    }

    res.status(200);
    responseFinalizer(req, res, foundReplay);

  });
  
  app.post('/api/replay/create', async (req, res) => {
    const { name, detail, process, creator } = req.body;
 
    const newReplay = new Replay({ name: name, detail: detail, process: process, creator: creator });

    const saveReplay = await sureThing(newReplay.save(), {
      success: 'success',
      rejected: 'Replay failed to save.'
    }); 

    if(!saveReplay.ok){
      res.status(500);
      responseFinalizer(req, res, saveReplay);
    }

    res.status(200);
    responseFinalizer(req, res, saveReplay);

  });

  app.put('/api/replay/:id', async (req, res) => {
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

    const updatedReplay = await sureThing(Replay.findOneAndUpdate({ _id: id }, newReplay), {
      success: 'success',
      rejected: 'Replay failed to update.'
    });

    if(!updatedReplay.ok){
      res.status(400);
      responseFinalizer(req, res, updatedReplay);
    }

    res.status(202);
    responseFinalizer(req, res, updatedReplay);

  });

  app.delete('/api/replay/:id', async (req, res) => {
    const id = req.params.id;

    const deleted = await sureThing(Replay.findOneAndDelete({ _id: id }), {
      success: "success",
      rejected: "Replay was not deleted."
    });

    if(!deleted.ok){
      res.status(500);
    }

    res.status(200);
    responseFinalizer(req, res, deleted);

  });
}