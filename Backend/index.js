
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const problemsRouter = require("./routes/problems")

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/problem", problemsRouter)

const PORT = 3000

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});