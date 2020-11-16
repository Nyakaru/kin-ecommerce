//@ts-check
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import morgan from "morgan"

const app = express();
const mongoURI = process.env.mongoURI || 'mongodb+srv://nyaks:N4aN3OuA6sy0IYP7@stock-manager-bha5c.mongodb.net/test?retryWrites=true&w=majority'

app.use(morgan('dev'));
app.use(bodyParser.json())

const connect = mongoose.connect(mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected......'))
    .catch(err => console.log(err));
app.get('/', (req, res) => {
    res.json({
        message: 'Sema  kimeumana sir!'
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
});
