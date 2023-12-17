// require('./env')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// name, password, email, phone, gender, hearAbout, city, state
// Define a User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  phone: Number,
  gender: String,
  hearAbout: Array,
  city: String,
  state: String  
});

const Registration = mongoose.model('Registration', userSchema);

// Route for user registration
app.post('/api/signup', async (req, res) => {
  const { name, password, email, phone, gender, hearAbout, city, state } = req.body;

  try {
    // Find the user in the MongoDB database
    const user = await Registration.create({ name, password, email, phone, gender, hearAbout, city, state });

    if (user) {
      // Success
      res.status(200).json({ message: "Registered Successfully" });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Registration failed' });
    }
  } catch (error) {
    // Handle any errors that occur during the database create
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  try {
    // Find the user in the MongoDB database
    const user = await Registration.findOne({ email: loginEmail, password: loginPassword });

    if (user) {
      // Success
      console.log(user)
      res.status(200).json({ message: "Login Successfully", user });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    // Handle any errors that occur during the database create
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getAllUsers', async (req, res) => {
  try {

    const user = await Registration.find();
    if(user.length) {
      res.status(200).json({message: 'Data fetched successfully', user})
    } else {
      res.status(401).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/api/add-user', async (req, res) => {
  const { username, email, mobile } = req.body;

  try {
    // Find the user in the MongoDB database
    const user = await Registration.create({ name: username, email: email, phone: mobile });

    if (user) {
      // Success
      res.status(200).json({ message: "User created Successfully" });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    // Handle any errors that occur during the database create
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/getUser', async (req, res) => {
  try {

    const user = await Registration.findById({_id: req.body.userId});
    if(user) {
      res.status(200).json({message: 'Data fetched successfully', user})
    } else {
      res.status(401).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/api/editFetchData', async (req, res) => {
  try {
    const user = await Registration.findById({_id: req.body.userId});
    if(user) {
      res.status(200).json({message: 'Data fetched successfully', user});
    } else {
      res.status(401).json({message: 'No data found'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Internal server eroor'});
  }
})

app.put('/api/update', async (req, res) => {
  try {
    const { name, email, phone, userId } = req.body;
    const user = await Registration.findOneAndUpdate({name, email, phone, where: {
      _id: userId
    }})
    if(user) {
      res.status(200).json({message: 'Updated successfully'});
    } else {
      res.status(401).json({message:'No data found'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Internnal server error'});
  }
})

app.delete('/api/delete', async (req, res) => {
  try {
    const { userToDelete = '' } = req.body
    const { _id } = userToDelete
    console.log(_id)
    const user = await Registration.findByIdAndDelete(_id)
    if(user) {
      res.status(200).json({message: "User deleted successfully"})
    } else {
      res.status(401).json({message: "Error in while deleting user"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Internnal server error'});
  }
})

// Get users with sorting
app.post('/api/sorting', async (req, res) => {
  try {
    let users;

    switch (req.body.sortCriteria) {
      case 'asc':
        users = await Registration.find().sort({ name: 1 });
        break;
      case 'desc':
        users = await Registration.find().sort({ name: -1 });
        break;
      case 'lastModified':
        users = await Registration.find().sort({ updatedAt: -1 });
        break;
      case 'lastInserted':
        users = await Registration.find().sort({ createdAt: -1 });
        break;
      default:
        users = await Registration.find();
        break;
    }

    res.status(200).json({message: "Records with sorting", user: users});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/searching', async (req, res) => {
  try {
    let users;
    const { searchTerm } = req.body;
    if(searchTerm) {
      const searchRegex = new RegExp(searchTerm, 'i');
      users = await Registration.find({
        $or: [
          { username: searchRegex },
          { mobile: searchRegex },
          { email: searchRegex },
        ],
      });
    } else {
      users = await Registration.find();
    }

    res.status(200).json({message: "Records with sorting", user: users});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});