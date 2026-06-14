let { MongoClient, ObjectId } = require("mongodb");
let url = process.env.MONGO_URL;

let add = async (obj, res) => {
    let client = new MongoClient(url);
    await client.connect();
    let db = client.db("Mern");
    let collection = db.collection("events");
    collection.insertOne(obj)
    .then((result) => { res.send(result) })
    .catch((err) => { res.send(err) })
    .finally(() => client.close());
}

let get = async (res) => {
    let client = new MongoClient(url);
    await client.connect();
    let db = client.db("Mern");
    let collection = db.collection("events");
    collection.find().toArray()
    .then((result) => res.send(result))
    .catch((err) => res.send(err))
    .finally(() => client.close())
}

let updateBooking = async (id, obj, res) => {
    let client = new MongoClient(url);
    await client.connect();
    let db = client.db("Mern");
    let collection = db.collection("events");
    collection.updateOne({ _id: new ObjectId(id) }, { $set: obj })
    .then((result) => res.send(result))
    .catch((err) => res.send(err))
    .finally(() => client.close())
}

let deleteBooking = async (id, res) => {
    let client = new MongoClient(url);
    await client.connect();
    let db = client.db("Mern");
    let collection = db.collection("events");
    collection.deleteOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((err) => res.send(err))
    .finally(() => client.close())
}

module.exports = { add, get, updateBooking, deleteBooking };