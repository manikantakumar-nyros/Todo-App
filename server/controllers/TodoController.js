const Todo = require('../models/Todo');

module.exports = {
	async save (req,res) {
		console.log('saving todo')
		await Todo.create(req.body, (err, data) =>{
			console.log(data)
			if(!err){
				res.json({
				status:"success",
				message:"Todo Added Successfully",
				data:data
			})
		   }
		})
	},
	async fetch (req,res) {
		console.log('get all todos')
		await Todo.find((err,data) =>{
			if(!err){
				res.json({
				status:"success",
				message:"Todos fetched Successfully",
				data:data
			})
		  } else{
		  	res.json({
		  		status:"failure",
		  		message:"Something went wrong"
		  	})
		  }
		})
	},
	async delete (req, res) {
    console.log('delete todo by id')
    await Todo.deleteOne({ _id: req.body.id }, (err, data) => {
      if (!err) {
        res.json({
          status: "success",
          message: "Todo deleted successfully"
        })
      } else {
        res.json({
          status: "fail",
          message: "Something went wrong"
        })
      }
    })
  },
  async getTodo (req, res) {
    console.log('get todo by id')
    await Todo.findOne({ _id: req.body.id }, (err, data) => {
      if (!err) {
        res.json({
          status: "success",
          message: "Todo updated successfully",
          data:data
        })
      } else {
        res.json({
          status: "fail",
          message: "Something went wrong"
        })
      }
    })
  },
  async updateTodo (req, res) {
    console.log('update todo by id')
    await Todo.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
      if (!err) {
        res.json({
          status: "success",
          message: "Todo updated successfully"
        })
      } else {
        res.json({
          status: "fail",
          message: "Something went wrong"
        })
      }
    })
  },

}