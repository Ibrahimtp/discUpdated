var express = require('express');
var router = express.Router();
const user = require('../user.js');
var session = require('express-session')

/* GET home page. */
router.get('/', async function(req, res) {
  /* if(req.session.userid) {
    currentUser = await user.findById(req.session.userid)
    if(currentUser.status) {
      res.send("still working the your conclusion")
    }
    else{
  res.render('discUpdated') }
  }
  else{
  } */
  res.render('welcome', {
    display: 'd-none'
  });
});

router.post("/signup", async(req, res)=> {




  newUser = await new user({
    name: capitalize(req.body.name.toLowerCase()),
    date: req.body.date,
    organization: req.body.org,
    position: req.body.position
  });

  await newUser.save()

  session = req.session;
  session.userid = newUser._id;



  res.render('discUpdated')
})



router.post('/submitScores', async(req, res)=> {
  if (req.session.userid) {
    currentUser = await user.findByIdAndUpdate(req.session.userid, {
      most: req.body.most, least: req.body.least, status: true
    })

    await currentUser.save()
    //  res.send("Will get back to you with the conclusion")
    res.render('getback')
  } else {
    res.redirect('/')
  }
})



router.get('/admin', async(req, res)=> {
  users = await user.find({
    status: true
  })

  res.render('admin', {
    user
  })
  // res.send(users)
})

router.get('/dremove', async(req, res)=> {
  uh = await user.find().remove()
  res.send(uh)
})

router.get('/deleteR/:id', async(req, res)=> {
  toBeDelete = await user.findById(req.params.id).remove();
  res.redirect('/admin')
})






function capitalize(str) {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

  }


  const str2 = arr.join(" ");
  return str2
}

function option(str) {
  if (str == 'option1') {
    return 'male'
  } else {
    return 'female'
  }
}

module.exports = router;