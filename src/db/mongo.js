require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.qthnw4r.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const c = await client.connect();
    
    const users = client.db('fc21').collection('users')
    const cities = client.db('fc21').collection('cities')

    await users.deleteMany({})
    await cities.deleteMany({})

    await cities.insertMany([
      {
        name: 'London',
        population: 10000000
      },
      {
        name: 'Paris',
        population: 2000000
      },
      {
        name: '서울',
        population: 10000000
      },
      {
        name: '부산',
        population: 2000000
      },
    ])

    await users.insertMany([
      {
        name: 'fran',
        age: 30,
        contacts: [
          {
            type: 'email',
            value: 'test@gmail.com'
          }
        ],
        city: 'London'
      },
      {
        name: 'deer',
        age: 19,
        city: '서울'
      },
      {
        name: 'frandeer',
        age: 30,
        city: '서울'
      },
    ])

    // const cursor = users.find({
    //   'contacts.type': 'email'
    // })

    const cursor = users.aggregate([
      {
        $lookup: {
          from: 'cities',
          localField: 'city',
          foreignField: 'name',
          as: 'city_info'
        }
      },{
        $match:{ 
            $or: [
              {
              'city_info.population': {
                $gte: 1000000
              }},
          {
            age: {
              $gte: 20
            }
        }]
        }
      },
      {
        $count : 'count'
      }
    ])



    const result = await cursor.forEach(console.log)


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run();