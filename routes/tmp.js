app.post('/adddept',(req,res)=>{  
    //it will add data to department table 

    if(req.body.dbName==null){
      res.json({
        code: 1000,
        description:"Field is required",
        field: "dbName"
      })
      return
    }
    deptModel.create(req.body)  
    .then(function(data){  
        res.json({da:data})  
    }).catch(function(error){  
          res.json({er:error})  
    })  
  });  
    
    
  app.post('/addemp',(req,res)=>{  
    //it will add data to emp table  
      empModel.create(req.body)  
      .then(function(data){  
            res.json({da:data})  
      }).catch(function(error){  
          res.json({er:error})  
      })  
  });  
    
    
  app.post('/deldept/:id',(req,res)=>{  
    //it will delete particular department data   
      deptModel.destroy({where:{id:req.params.id}})  
      .then(function(data){  
          res.json({da:data})  
      })  
      .catch(function(error){  
          res.json({er:error})  
      })  
  });  
    
  app.get('/',(req,res)=>{  
    //this will join the tables and display data  
      empModel.findAll({include: [{ model:deptModel}]})  
      .then(function(data){  
          res.json({uri:"/emps",
                    data: data,
                  page:1,
                totalPages:1})  
      })  
      .catch(function(error){  
          res.json({er:error})  
      })  
  });  

  app.get('/count',(req,res)=>{  
    //this will join the tables and display data  
      deptModel.findAll({attributes:["dbName",[sequelize.fn('COUNT', sequelize.col('id')), 'values']],group:"dbName" })  
      .then(function(data){  
          res.json({uri:"/emps",
                    data: data,
                  page:1,
                totalPages:1})  
      })  
      .catch(function(error){  
          res.json({er:error})  
      })  
  });  