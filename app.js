const express =require("express");
const path = require("path");
const app =express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port =8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    Name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });
  const contact = mongoose.model('contact', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))


app.get('/',(req,res)=>{
    const con ="This is the best academy of our city.Join us!";
    const params ={'title':'Dance Academy','content':con};
    res.status(200).render('home.pug',params);

});

app.get('/contact',(req,res)=>{
    const con ="This is the best academy of our city.Join us!";
    const params ={'title':'Dance Academy','content':con};
    res.status(200).render('contact.pug',params);

});

app.post('/contact',(req,res)=>{
    var mydata =new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved");
    }).catch(()=>{
        res.status(400).send("this item is not saved");
    })

});




app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});
