var mysql = require('mysql');
var data = require('./data.js')

var PRODUCTION_DB = data.PRODUCTION_DB,
    TEST_DB = data.TEST_DB

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCION = 'mode_production'

var state = {
    pool:null,
    mode:null
}

exports.connect = function(mode,done){
    state.pool = mysql.createPool({
        host: data.HOST,
        user: data.USER,
        password:data.PASSWORD,
        database: mode === exports.MODE_PRODUCION ?  PRODUCTION_DB : TEST_DB
    })
    state.mode = mode
    done()
}

exports.get = function(){
    return state.pool;
}