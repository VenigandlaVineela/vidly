// const winston = require("winston")
// // require('winston-mongodb');
// // require('express-async-errors');

// module.exports=function(){
     
     
//      winston.handleExceptions(
//           new winston.transports.Console({colorize:true,prettyprint:true}),
//          new winston.transports.File({filename:'uncaughtExceptions.log'}));
//          // winston.add(winston.transport.File,{filename:'logfile.log'})
     
//          process.on('unhandledRejection',(ex)=>{
//              throw ex;
//          })

//          winston.add(winston.transports.File,{filename:'logfile.log'});
//         //  winston.add(winston.transports.MongoDB,{
//         //   db:'mongodb://localhost:27017/vidly',
//         //   level:'info'
//         //  });

      
// }



const winston = require("winston");
// require('winston-mongodb');
// require('express-async-errors');

module.exports = function() {
    // Handle uncaught exceptions
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // Log all errors to a file called logfile.log
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
};
