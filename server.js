const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

app.use(express.json());

// DB config
const db = config.get("mongoURI");

// connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/admin", require("./routes/api/admins"));
app.use("/user", require("./routes/api/users"));
app.use("/medic", require("./routes/api/medics"));
app.use("/staff", require("./routes/api/staffs"));
app.use("/auth", require("./routes/api/auth"));
app.use("/tests", require("./routes/api/tests"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
