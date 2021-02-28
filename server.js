const express = require("express");
const app = express();
const connectdb = require("./config/db");

// connect db
connectdb();
// Init middleware
app.use(express.json({ extended: false }));
//app
app.get("/", (req, res) => res.json({ msg: "Welcome to the eStore Api..." }));

// Define auth  Routes
app.use("/api/authadmin", require("./routes/authadmin"));
// Define Routes
app.use("/api/admin", require("./routes/admin"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/customers", require("./routes/customers"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
