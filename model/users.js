var db = require('../db.js')

exports.insertUser = function(email,name,school,major,phone, done) {
  var values = [email,name,school,major,phone];
  
  db.get().query('INSERT INTO users (u_id, u_name, u_school,u_major,u_phone) VALUES(?,?,?,?,?)', values, function(err, result) {
    if (err) return done(err)
    done(null, result)
  })
}

// exports.updateUser = function(username, password, done) {
//   var values = [password, username];
  
//   db.get().query('UPDATE user SET password=? WHERE username=?', values, function(err, result) {
//     if (err) return done(err)
//     done(null, result.username)
//   })
// }

// exports.deleteUser = function(username, done) {
//   var values = [username];
  
//   db.get().query('DELETE FROM user WHERE username=?', values, function(err, result) {
//     if (err) return done(err)
//     done(null, result)
//   })
// }

exports.getUser = function(email, done) {
  var values = [email];
  
  db.get().query('SELECT * FROM users WHERE u_id=?', values, function(err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

// exports.getAllUser = function(done) {
//   db.get().query('SELECT * FROM user', function (err, rows) {
//     if (err) return done(err)
//     done(null, rows)
//   })
// }
