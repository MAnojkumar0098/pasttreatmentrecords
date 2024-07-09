const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");

const uri =
  "mongodb+srv://manoj:manoj888@cluster0.20qgyot.mongodb.net/rehab?retryWrites=true&w=majority";

let db;

async function connectToMongoDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Set database
    db = client.db("rehab");

    // Ping the server
    await db.command({ ping: 1 });
    console.log("Ping successful");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error;
  }
}

connectToMongoDB().catch(console.error);

app.listen(3002, () => console.log("Server started"));

app.get("/submit", (req, res) => {
  res.render("output", { data: [{}] });
});

app.post("/submit", async (req, res) => {
  const data = req.body;
  console.log("Form data:", data);

  const patientsCollection = db.collection("patients");

  try {
    // Insert data into MongoDB
    const insertResult = await patientsCollection.insertOne({
      name: data.name,
      id: data.id,
      year: data.year,
      place: data.place,
      Center: data.center,
      treatment_period: data.tperiod_value,
      sobriety_period: data.speriod_value,
      reason: data.reason,
      relapse: data.relapse_value,
    });
    console.log("Inserted:", insertResult.ops);

    // Fetch all patients
    const selectResults = await patientsCollection.find({}).toArray();
    console.log("All patients:", selectResults);
  } catch (error) {
    console.error("Error executing MongoDB operations:", error);
    res.status(500).send("Internal Server Error");
    return;
  }

  res.json("Form submitted successfully");
});
