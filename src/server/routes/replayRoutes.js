import Replay from '../models/replayModel';
import { sureThing, responseFinalizer } from '../../helpers';

export const replayRoutes = (app) => {

  app.get('/api/replays/process/:id', async (req, res) => {
    const id = req.params.id;

    const replays = await sureThing(Replay.find({ process: id }).sort({ createdAt: 'desc' }).exec(), {
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

    console.log("NEW REPLAY BODY", req.body);

    const { process, creator, hypothesis, experiment, analysis, conclusion, tags } = req.body;
 
    const newReplay = new Replay(
      {
        process: process, 
        creator: creator,
        hypothesis: hypothesis,
        experiment: experiment,
        analysis: analysis,
        conclusion: conclusion,
        tags: tags
      });

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

    if(req.body.process){
      newReplay.process = req.body.process;
    }

    if(req.body.hypothesis){
      newReplay.hypothesis = req.body.hypothesis;
    }

    if(req.body.experiment){
      newReplay.experiment = req.body.experiment;
    }

    if(req.body.analysis){
      newReplay.analysis = req.body.analysis;
    }

    if(req.body.conclusion){
      newReplay.conclusion = req.body.conclusion;
    }

    if(req.body.tags){
      newReplay.tags = req.body.tags;
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