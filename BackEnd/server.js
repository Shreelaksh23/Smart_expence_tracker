const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./Config/db.js");

dotenv.config();
connectDB();

const app=express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", require("./Routers/authRoutes.js"));
app.use("/api/expenses",require("./Routers/expenseRoutes.js"));
app.use("/api/insights", require("./Routers/insightRoutes.js"));
app.use("/api/users",require("./Routers/userRoutes.js"))


app.get("/",(req,res)=>{
    res.send("expense tracker API is running")
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is runing on port ${PORT}`);
    
})