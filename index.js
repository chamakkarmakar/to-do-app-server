const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hmmar.mongodb.net/?retryWrites=true&w=majority`;
const uri = 'mongodb+srv://dbUser2:cMWtGSOgDB2z4UxK@cluster0.hmmar.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('Mongodb Connected');
        const taskCollection = client.db("dbTaskManage").collection("tasks");

        app.get('/tasks', async (req, res) => {
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
            
        })
        
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('TO Do App');
})

app.listen(port, () => {
    console.log(port);
})
