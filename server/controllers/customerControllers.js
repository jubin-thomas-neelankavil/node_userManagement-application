const Customer = require("../models/Customer");

const mongoose = require("mongoose");

// HomePage
//Get

// exports.homepage = async (req, res) => {
//   const message = await req.consumeFlash("info");

//   const locals = {
//     title: "node js",
//     description: "free node js user management system",
//   };

//   try {
//     const customers = await Customer.find().limit(22);

//     console.log(customers, "55555");
//     res.render("index", { locals, message, customers });
//   } catch (error) {
//     console.log(error);
//   }
// };




// HomePage
//Get and pageination

exports.homepage = async (req, res) => {

  const messages = await req.consumeFlash('info');
  const locals = {
    title: 'NodeJs',
    description: 'Free NodeJs User Management System'
  }

  let perPage = 3;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); 
    const count = await Customer.count();

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages
    });

  } catch (error) {
    console.log(error);
  }
}





// new costomer form

exports.addCustomer = async (req, res) => {
  const locals = {
    title: "nadd new customer",
    description: "free node js user management system",
  };

  res.render("customer/add", { locals });
};

// post create new customer

exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
  });

  try {
    await Customer.insertMany(newCustomer);
    await req.flash("info", "New Customer Has Been Added");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


// view cistomer details

exports.view = async (req, res) => {
  


  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    
    const locals = {
      title: "view customer data",
      description: "free node js user management system",
    };

    res.render('customer/view', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error)
  }
}


//get customer details
exports.edit = async (req, res) => {
  


  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    
    const locals = {
      title: "edit customer data",
      description: "free node js user management system",
    };

    res.render('customer/edit', {
      locals,
      customer
    })

  } catch (error) {
    console.log(error)
  }
}


//update customer
exports.editPost = async (req, res) => {
  

try {
  await Customer.findByIdAndUpdate(req.params.id,{
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    updatedAt: Date.now(),
  });
  res.redirect(`/edit/${req.params.id}`)
} catch (error) {
  console.log(error)
}

}



//Delete customer
exports.deleteCustomer = async (req, res) => {
  res.redirect('/')
try {
  await Customer.deleteOne({_id : req.params.id})
} catch (error) {
  console.log(error)
}

  
  }

// get search customer
exports.serchCustomers = async (req, res) => {

  const locals = {
    title: "search customer data",
    description: "free node js user management system",
  };
    
  let searchTerm = req.body.searchTerm;

  const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

  try {
    
    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        {lastName: {$regex : new RegExp(searchNoSpecialChar,"i")}}
  ]
})

    res.render("search",{customers,locals})
  } catch (error) {
    console.log(error)
  }

  }