import express from 'express';
import dotenv from 'dotenv';
import  connectionToDB from './config/db.js'
import userRoutes from './routes/user.router.js'
import projectRoutes from './routes/project.router.js'
import taskRoutes from './routes/task.router.js';
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())  

const allowedOrigins = [
  "https://task-tracker-lsul.onrender.com/",  
];

app.use(cors({
  origin:allowedOrigins,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true, 
}))

app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/ping', (req, res) => res.send('Task Manger '))


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectionToDB()
    console.log(`Server is running at http://localhost:${PORT}`)
  })
