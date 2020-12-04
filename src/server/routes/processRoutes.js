import Process from '../models/processModel';
import { sureThing, responseFinalizer } from '../../helpers'; 
import { authentication } from './authRoutes';
//import { authentication, responseHandler } from './authRoutes'; // import { authentication, responseHandler } from './authRoutes'; 

export const processRoutes = (app) => {

  app.get('/api/processes/user/:userId', authentication, async (req, res) => {
    // const userId = req.params.userId;

    if(!id || !res.locals.user._id){
      res.status(404);
      res.responseFinalizer(req, res, { ok: false, message: "missing user"});
      return;
    }

    const processes = await sureThing(Process.find({ creator: res.locals.user._id }).exec(), {
      success: 'success',
      rejected: 'The processes were not found.'
    });

    if(!processes.ok) {
      res.status(404)
      responseFinalizer(req, res, processes);
      return;
    }

    res.status(200);
    responseFinalizer(req, res, processes);
    return;

  });

  app.get('/api/processes/:id', authentication, async (req, res) => {
    const id = req.params.id;

    if(!id || !res.locals.user){
      res.status(404);
      responseFinalizer(req, res, { ok: false, message: "missing user"});
      return;
    }

    const foundProcess = await sureThing(Process.findOne({ _id: id, creator: res.locals.user._id }).exec(), {
      success: 'success',
      rejected: 'The process was not found.'
    });

    if(res.locals.user._id !== foundProcess.result.creator){
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden"});
      return;
    }

    if(!foundProcess.ok){
      res.status(404);
      responseFinalizer(req, res, foundProcess);
      return;
    }

    res.status(200);
    responseFinalizer(req, res, foundProcess);
    return;

  });

  app.post('/api/processes/create', authentication, async (req, res) => {
    const { process, creator, category, tags } = req.body;

    if(res.locals.user._id !== creator){
      res.status(403);
      responseFinalizer(req, res, { ok: false, message: "Forbidden"});
      return;
    }

    const newProcess = new Process({ process: process, creator: creator, category: category, tags: tags });

    const saveProcess = await sureThing(newProcess.save(), {
      success: 'success',
      rejected: 'Process failed to save.'
    });

    if(!saveProcess.ok){
      res.status(500);
      responseFinalizer(req, res, saveProcess);
      return;
    }

    res.status(200);
    responseFinalizer(req, res, saveProcess);
    return;

  });

  app.put('/api/processes/:id', authentication, async (req, res) => {
    const newProcess = {};
    const id = req.params.id;

    if(req.body.process){
      newProcess.process = req.body.process;
    }

    if(req.body.category){
      newProcess.category = req.body.category;
    }

    if(req.body.tags){
      newProcess.tags = req.body.tags;
    }
    
    if(!res.locals.user._id){
      res.status(404);
      responseFinalizer(req, res, { ok: false, message: "Forbidden"});
      return;
    }

    const updatedProcess = await sureThing(Process.findOneAndUpdate({ _id: id, creator: res.locals.user._id }, newProcess), {
      success: 'success',
      rejected: 'Process failed to update.'
    });

    if(!updatedProcess.ok){
      res.status(400);
      responseFinalizer(req, res, updatedProcess);
      return;
    }

    res.status(202);
    responseFinalizer(req, res, updatedProcess);
    return;

  });

  app.delete('/api/processes/:id', authentication ,async (req, res) => {
    const id = req.params.id;

    if(!res.locals.user._id){
      res.status(404);
      responseFinalizer(req, res, { ok: false, message: "Forbidden"});
      return; 
    }

    const deleted = await sureThing(Process.findOneAndDelete({ _id: id, creator: res.locals.user._id }), {
      success: "success",
      rejected: "Process was not deleted."
    });

    if(!deleted.ok) {
      res.status(500);
    }

    res.status(200);
    responseFinalizer(req, res, deleted);
    return;
  });

}