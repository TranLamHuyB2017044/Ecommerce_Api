const Order = require("../models/order.model");



const CreateOrder = async (req, res) => {
    try {
        const newOrder =  new Order(req.body)
        const saveOrder = await newOrder.save()
        res.status(200).json(saveOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}

const UpdateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const DeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};


const GetUserOrder = async (req, res) => {
  try {
    const Orders = await Order.find({userID: req.params.userID});
    res.status(200).json(Orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAll = async (req, res) => {
    try {
        const Orders = await Order.find()
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getMonthlyIncome = async (req, res) =>{
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
  try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        { $project: 
          { month: { $month: "$createdAt" },
           sale: "$amount" 
          },  
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sale" },
          },
        },
      ]);
      res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error)
  }
}



module.exports = { UpdateOrder, DeleteOrder, GetUserOrder, CreateOrder, GetAll, getMonthlyIncome};
