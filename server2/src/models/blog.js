const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        categories:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Categories'
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        excerpt:{
            type: String,
        },
        thumbnail:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Media'
        },
        tags:[
            
                {
                   type:String,
                    required: true        
                },
           
        ],
        slug:{
            type:String,
            required:true,
        }

        
        // ticket:Number
    },
    {
        timestamps: true
    }
)

// blogSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket',
//     id: 'ticketNums',
//     start_seq: 500
// })

module.exports = mongoose.model('Blog', blogSchema)