import { getEmailCode } from "."
// const getEmailCode=require('.')

const params={
    userName:'easd1',
    password:'12213123',
    email:'win1113330101@gmail.com'
}

const paramForTest={
    email:'win1113330101@gmail.com'
}

getEmailCode(paramForTest)
.then((resp)=>{
    console.log(resp)
})
.catch((resp)=>{
    console.log(resp);
})

