var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function (req, res, next){
  res.render('signup');
});

router.post('/signup', function(req, res, next){
  // var password = bcyrpt.hashSync(req.body.password,8);
  //
  // knex('users').where({username: req.body.username.toLowerCase()})
  // .then(function(data){
  //   if(data.length) {
  //     res.render('signuperror'):
  //   }
  //   knex('users').insert({
  //     username: req.body.username.toLowerCase(),
  //     password: password
  //   }
  // ).returning('id')
  // .then(utils.flatten)
  // .then(function(id){
  //   res.session.id = id;
  //   res.redirect('/');
  // })
  // .catch(function(err){
  //   next(err);
  // });
  // })
  // .catch(function(err){
  // next(err);
  // });
  res.render('Post signup');

});

router.get('/signin', function(req, res, next){
  res.render('signin')
});

router.post('/signin', function(req, res, next){
  // knex('users')
  // .where({username: req.body.username.toLowerCase()})
  // .first()
  // .then(function(data){
  //   if(!data){
  //     res.render('signinfailure')
  //   }
  //   if(bcrypt.compareSync(req.body.password, data.password))
  //   {
  //     req.session.id = data.id;
  //     res.redirect('/')
  //   }
  //   else
  //   {
  //     res.render('signinfailure')
  //   }
  // });
    res.send('Post signin')
});

router.get('/signout', function(req, res, next){
  req.session = null;
  res.redirect('/');
});

function redirectSignedIn(req, res, next){
  if (!req.session.id){
    next();
  }
  res.redirect('/')
}


module.exports = router;
