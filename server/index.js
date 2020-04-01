const express=require('express')

const app=express()

app.use(require('cors')())

app.use(express.json())

const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/diary-management',{
    useNewUrlParser:true,
    useFindAndModify:true,
    useCreateIndex:true
})

const Diary=mongoose.model('Diary',new mongoose.Schema({               
    title:{type:String}, 
    weather:{type:String},
    date:{type:String},                                                  
    body:{type:String}
}))

// 保存新建的日记
app.post('/api/diaries',async(req,res)=>{                  
    const diary=await Diary.create(req.body)             
    res.send(diary)  
}) 


//获取全部日记列表
app.get('/api/diaries',async(req,res)=>{
    const diaries=await Diary.find()
    res.send(diaries)
})

// 删除某篇日记
app.delete('/api/diaries/:id',async(req,res)=>{
    await Diary.findByIdAndDelete(req.params.id)
    res.send({
        status:true                                          //状态为true，返回给前端
    })
})

// 获取要被编辑的日记 / 获取要被查看的日记
app.get('/api/diaries/:id',async(req,res)=>{
    const diary = await Diary.findById(req.params.id)
     res.send(diary)
 })

//修改某篇日记
app.put('/api/diaries/:id',async(req,res)=>{
    const diary = await Diary.findByIdAndUpdate(req.params.id,req.body)
     res.send(diary)
 }) 




app.listen('3000',()=>{
    console.log('localhost:3000');
    
})