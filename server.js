// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/CODERESPONSE', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define a schema and model for the queries
// const querySchema = new mongoose.Schema({
//   userQuestion: String,
//   response: String,
//   timeComplexity: String,
//   language: String,
//   timestamp: { type: Date, default: Date.now },
// });

// const Query = mongoose.model('Query', querySchema);

// // Endpoint to save a query
// app.post('/save-query', async (req, res) => {
//   const { userQuestion, response, timeComplexity, language } = req.body;

//   const newQuery = new Query({
//     userQuestion,
//     response,
//     timeComplexity,
//     language,
//   });

//   try {
//     await newQuery.save();
//     res.status(201).send(newQuery);
//   } catch (error) {
//     console.error('Error saving query:', error);
//     res.status(400).send('Error saving query');
//   }
// });

// // Endpoint to get all queries
// app.get('/get-queries', async (req, res) => {
//   try {
//     const queries = await Query.find().sort({ timestamp: -1 }); // Sorting by most recent
//     res.status(200).send(queries);
//   } catch (error) {
//     console.error('Error fetching queries:', error);
//     res.status(500).send('Error fetching queries');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/CODERESPONSE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for the queries
const querySchema = new mongoose.Schema({
  userQuestion: String,
  response: String,
  timeComplexity: String,
  language: String,
  timestamp: { type: Date, default: Date.now },
});

const Query = mongoose.model('Query', querySchema);

// Endpoint to save a query
app.post('/save-query', async (req, res) => {
  const { userQuestion, response, timeComplexity, language } = req.body;

  const newQuery = new Query({
    userQuestion,
    response,
    timeComplexity,
    language,
  });

  try {
    await newQuery.save();
    res.status(201).send(newQuery);
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(400).send('Error saving query');
  }
});

// Endpoint to get all queries
app.get('/get-queries', async (req, res) => {
  try {
    const queries = await Query.find().sort({ timestamp: -1 }); // Sorting by most recent
    res.status(200).send(queries);
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).send('Error fetching queries');
  }
});

// Define a schema and model for the feedback
const feedbackSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Endpoint to save feedback
app.post('/save-feedback', async (req, res) => {
  const { name, phoneNumber, feedback } = req.body;

  const newFeedback = new Feedback({
    name,
    phoneNumber,
    feedback,
  });

  try {
    await newFeedback.save();
    res.status(201).send(newFeedback);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(400).send('Error saving feedback');
  }
});

// Endpoint to get all feedback
app.get('/get-feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 }); // Sorting by most recent
    res.status(200).send(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).send('Error fetching feedback');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
