import express from "express";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is now listening on port: ${port}`);
});
