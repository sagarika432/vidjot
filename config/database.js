if(process.env.NODE_ENV === 'production'){
    module.exports= {
        mongoURI : 'mongodb://varshak333:varshak333@ds133621.mlab.com:33621/vidjot-prod-varsha'
    }
} else {
    module.exports ={
        mongoURI :'mongodb://localhost/vidjot-dev'
    }
}