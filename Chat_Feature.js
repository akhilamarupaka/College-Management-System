const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:
 
'',
  database: 'phase4'
});
const cors = require('cors'); // Import the cors middleware
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.post('/messagesbyid', (req, res) => {
	 const { senderId, receiverId} = req.body;
  connection.query('SELECT * FROM messages WHERE (sender_ID = ? AND receiver_ID = ?) OR (sender_ID = ? AND receiver_ID = ?)', [receiverId, senderId, senderId, receiverId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving messages');
    } else {
      // Convert results into an array of objects with sender and receiver information
      const formattedMessages = results.map(message => {
        return {
          id: message.message_ID,
          content: message.content,
          sender: {
            id: message.sender_ID,
          },
          receiver: {
            id: message.receiver_ID,
          },
        };
      });

      res.send(formattedMessages);
    }
  });
});

// Create a new message
app.post('/messages', (req, res) => {
  const { senderId, receiverId, content } = req.body;

  connection.query('INSERT INTO messages (sender_ID, receiver_ID, content) VALUES (?, ?, ?)', [senderId, receiverId, content], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating message');
    } else {
      res.status(200).send('Message created successfully');
    }
  });
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});