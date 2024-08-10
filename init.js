const mongoose = require('mongoose');
const chat = require('./model/todo');


main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}


let alljobs=[
    {
        job:"code"
    },
    {
        job:"eat"
    },
    {
        job:"sleep"
    },
    {
        job:"study"
    }

];

chat.insertMany(alljobs);