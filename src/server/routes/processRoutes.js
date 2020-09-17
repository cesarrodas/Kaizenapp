import Process from '../models/processModel';
import { sureThing, responseFinalizer } from '../../helpers'; 
//import { authentication, responseHandler } from './authRoutes'; // import { authentication, responseHandler } from './authRoutes'; 

export const processRoutes = (app) => {

  app.get('/api/processes/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    const processes = await sureThing(Process.find({ creator: userId }).exec(), {
      success: 'success',
      rejected: 'The processes were not found.'
    });

    if(!processes.ok) {
      res.status(404)
      responseFinalizer(req, res, processes);
    }

    res.status(200);
    responseFinalizer(req, res, processes);

  });

  app.get('/api/processes/:id', async (req, res) => {
    const id = req.params.id;

    const foundProcess = await sureThing(Process.findOne({ _id: id }).exec(), {
      success: 'success',
      rejected: 'The process was not found.'
    });

    if(!foundProcess.ok){
      res.status(404);
      responseFinalizer(req, res, foundProcess);
    }

    res.status(200);
    responseFinalizer(req, res, foundProcess);

  });

  app.post('/api/processes/create', async (req, res) => {
    const { name, creator } = req.body;

    const newProcess = new Process({ name: name, creator: creator });

    const saveProcess = await sureThing(newProcess.save(), {
      success: 'success',
      rejected: 'Process failed to save.'
    }); 

    if(!saveProcess.ok){
      res.status(500);
      responseFinalizer(req, res, saveProcess);
    }

    res.status(200);
    responseFinalizer(req, res, saveProcess);

  });

  app.put('/api/processes/:id', async (req, res) => {
    const newProcess = {};
    const id = req.params.id;

    if(req.body.name){
      newProcess.name = req.body.name;
    }

    const updatedProcess = await sureThing(Process.findOneAndUpdate({ _id: id }, newProcess), {
      success: 'success',
      rejected: 'Process failed to update.'
    });

    if(!updatedProcess.ok){
      res.status(400);
      responseFinalizer(req, res, updatedProcess);
    }

    res.status(202);
    responseFinalizer(req, res, updatedProcess);

  });

  app.delete('/api/processes/:id', async (req, res) => {
    const id = req.params.id;

    const deleted = await sureThing(Process.findOneAndDelete({ _id: id }), {
      success: "success",
      rejected: "Process was not deleted."
    });

    if(!deleted.ok) {
      res.status(500);
    }

    res.status(200);
    responseFinalizer(req, res, deleted);

  });

}