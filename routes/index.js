var express = require('express');
const { User } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', { title: 'index' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register' });
 });

//로그인
router.post('/checkLogin', async (req, res, next) => {
  const { uid, pw } = req.body

  if(!uid || !pw) return res.send('<script>alert("로그인에 실패하였습니다.");location.href="/"</script>');

    try {
      const user = await User.findOne({ where: { uid, pw } }); // select * from User(table) where uid = uid , pw = pw
      if(!user) return res.send('<script>alert("회원 정보가 없습니다.");location.href="/"</script>');
      console.log(user.dataValues)
      return res.send(`<script>alert("${uid}님 로그인에 성공하였습니다.");location.href="/"</script>`);
    } 

    catch(err) {
      console.error(err)
      return res.send('<script>alert("error");location.href="/"</script>');
    }
})

//회원가입
router.post('/checkRegister', async (req, res, next) => {
  const { uid, pw } = req.body

  if(!uid || !pw) return res.send('<script>alert("회원가입에 실패하였습니다.");location.href="/"</script>');

  try {
    const user = await User.create({ uid, pw }); // insert into User value ~~~
    if(user == null) return res.send('<script>alert("회원 정보가 없습니다.");location.href="/"</script>');
    console.log(user.dataValues)

    return res.send(`<script>alert("${uid}님 회원가입 성공하였습니다.");location.href="/"</script>`);
  } 
  
    catch(err) {
    console.error(err)
    return res.send('<script>alert("error");location.href="/"</script>');
  }
});

module.exports = router;
