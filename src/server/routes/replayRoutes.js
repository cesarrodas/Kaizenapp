import Replay from '../models/replayModel';
import { sureThing, responseFinalizer } from '../../helpers';
import { authentication } from './authRoutes';

export const replayRoutes = (app) => {

  app.get('/api/replays/process/:id', authentication, async (req, res) => {
    const id = req.params.id;

    if(!res.locals.user._id) {
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden."});
      return;
    }

    const replays = await sureThing(Replay.find({ process: id, creator: res.locals.user._id }).sort({ createdAt: 'desc' }).exec(), {
      success: 'success',
      rejected: 'The replays were not found.'
    });

    if(!replays.ok) {
      res.status(404)
      responseFinalizer(req, res, replays);
      return;
    }

    res.status(200);
    responseFinalizer(req, res, replays);
    return;

  });

  app.get('/api/replay/:id', authentication, async (req, res) => {
    const id = req.params.id;

    if(!res.locals.user._id) {
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden."});
      return;
    }

    const foundReplay = await sureThing(Replay.findOne({ _id: id, creator: res.locals.user._id }).exec(), {
      success: 'success',
      rejected: 'The replay was not found.'
    });

    if(!foundReplay.ok){
      res.status(404);
      responseFinalizer(req, res, foundReplay);
      return;
    }

    res.status(200);
    responseFinalizer(req, res, foundReplay);
    return;

  });
  
  app.post('/api/replay/create', authentication, async (req, res) => {
    
    const { process, creator, hypothesis, experiment, analysis, conclusion, tags } = req.body;

    if(!res.locals.user._id || creator != res.locals.user._id) {
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden."});
      return;
    }

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
      return;
    }

    res.status(200);
    responseFinalizer(req, res, saveReplay);
    return;

  });

  app.put('/api/replay/:id', authentication, async (req, res) => {
    const newReplay = {};
    const id = req.params.id;

    if(!res.locals.user._id) {
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden."});
      return;
    }

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

    const updatedReplay = await sureThing(Replay.findOneAndUpdate({ _id: id, creator: res.locals.user._id }, newReplay), {
      success: 'success',
      rejected: 'Replay failed to update.'
    });

    if(!updatedReplay.ok){
      res.status(400);
      responseFinalizer(req, res, updatedReplay);
      return;
    }

    res.status(202);
    responseFinalizer(req, res, updatedReplay);
    return;

  });

  app.delete('/api/replay/:id', authentication, async (req, res) => {
    const id = req.params.id;

    if(!res.locals.user._id) {
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden."});
      return;
    }

    const deleted = await sureThing(Replay.findOneAndDelete({ _id: id, creator: res.locals.user._id }), {
      success: "success",
      rejected: "Replay was not deleted."
    });

    if(!deleted.ok){
      res.status(500);
    }

    res.status(200);
    responseFinalizer(req, res, deleted);
    return;
  });
}