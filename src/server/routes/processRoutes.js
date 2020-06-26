export const processRoutes = (app) => {

  app.get('/api/tasks', function(req, res){
    res.render('some', {
      title: 'Something'
    });
  });

}