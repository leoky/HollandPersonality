var express = require('express');
var router = express.Router();
var session = require('express-session');
var result=[];
var checkUser=function(req,res,next){
    if(req.session.username == undefined){
        req.session.username = false;
    }
    if(req.session.username){
        next();
    }else{
        res.redirect('/users');
    }
    
}

/* GET home page. */
router.get('/',checkUser,function(req, res, next) {
    var question = [
        "Farming",
        "Solving math problems",
        "Being in a play",
        "Studying other cultures",
        "Talking to people at a party",
        "Working with computers",
        "Working on cars or lawnmowers",
        "Astronomy",
        "Drawing or painting",
        "Going to church/temple/mosque",
        "Working on a sales campaign",
        "Using a cash register",
        "Carpentry",
        "Physics",
        "Foreign language",
        "Teaching children",
        "Buying clothes for a store",
        "Working from nine to five",
        "Setting type for a printing job",
        "Using a chemistry set",
        "Reading art, fiction or plays",
        "Helping people with problems",
        "Selling life insurance",
        "Typing reports",
        "Driving a truck",
        "Working in a lab",
        "Playing a musical instrument",
        "Making new friends",
        "Leading a group",
        "Following a budget",
        "Fixing electrical appliances",
        "Building rocket models",
        "Writing stories or poetry",
        "Attending sports events",
        "Being elected as class president",
        "Using business machines",
        "Building things",
        "Doing puzzles",
        "Fashion design",
        "Belonging to a club/ organization",
        "Giving talks or speeches",
        "Keeping detailed records",
        "Wildlife biology",
        "Being in a science fair",
        "Going to concerts",
        "Working with the elderly",
        "Sales people",
        "Filing letters and reports"
    ];
    res.render('index', { title: 'Holland Personality Test', question: question });
});

function arrange(array) {
    var temp;
    for (var i = 0; i < array.length; i++) {
        for (var j = array.length - 1; j > i; j--) {
            if (array[j][1] > array[j - 1][1]) {
                temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }
}

router.post('/result', function(req, res, next) {
    var answer = req.body.arr || [];
    console.log(answer);
    var check = [
        ["R", 0],
        ["I", 0],
        ["A", 0],
        ["S", 0],
        ["E", 0],
        ["C", 0]
    ];
    for (var j = 0; j < answer.length; j++) {
        switch (answer[j]) {
            case "1":
                check[0][1]++;
                break;
            case "2":
                check[1][1]++;
                break;
            case "3":
                check[2][1]++;
                break;
            case "4":
                check[3][1]++;
                break;
            case "5":
                check[4][1]++;
                break;
            case "0":
                check[5][1]++;
                break;
        }
    }
    var user = {
        name:req.session.name,
        school:req.session.school
    }
    arrange(check);
    check.push({name:req.session.name});
    console.log(check);
    result = check;
    res.send(check);
})

function TEST(name){
            var end = name.indexOf(" ");
          if(end==-1){
            end = name.length;
          }
          return end;
          }

router.get('/done',(req,res)=>{
  
        res.mailer.send('mail/email', {
          to:req.session.username, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
          subject: 'Holland Personality Test', // REQUIRED.
          name:req.session.name.charAt(0).toUpperCase()+req.session.name.substring(1,TEST(req.session.name)),
          // name:req.session.name.charAt(0).toUpperCase()+req.session.name.slice(1),
          result:result,
          attachments:[
            {   // filename and content type is derived from path
                filename: 'header.png',
                filePath: process.cwd() + '/public/images/main/header.png',
                cid: 'header' 
            },
            // {   // filename and content type is derived from path
            //     filename: 'hmjsi.png',
            //     filePath: process.cwd() + '/public/images/main/hmjsi.png',
            //     cid: 'header' 
            // },
            {
                filename: 'footer.png',
                filePath: process.cwd() + '/public/images/main/footer.png',
                cid: 'FooterHTML'
            }
           
          ],
          otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
        }, function (err) {
          if (err) {
            // handle error 
            console.log(err);
            res.send('There was an error sending the email');
            return;
          }else{
              console.log("email sent");
          }
        });

    req.session.destroy();
    res.redirect('/');
});


module.exports = router;