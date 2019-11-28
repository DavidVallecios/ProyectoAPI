const  mongoose  = require('mongoose')

let database = 'ReservaLaboPrueba'
let host = 'localhost'
let port = '50451'
let uri = `mongodb://${host}/${database}`

mongoose.set('useFindAndModify', false);
const connect = ()=>{
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => {
        console.log('Db connected')
    })
    .catch( (err) => {
        console.log(err)
    })
}

mongoose.Promise = global.Promise

module.exports = { connect }