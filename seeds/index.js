const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/YelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '62e2d39617df8c4f4138a4a4',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam distinctio id, obcaecati expedita eveniet maxime.",
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dpxiq1wps/image/upload/v1659112718/YelpCamp/lpikifw31rg7veq4vi5q.jpg',
          filename: 'YelpCamp/lpikifw31rg7veq4vi5q',
        },
        {
          url: 'https://res.cloudinary.com/dpxiq1wps/image/upload/v1659112718/YelpCamp/mibtzo7n2famt680mtbq.jpg',
          filename: 'YelpCamp/mibtzo7n2famt680mtbq',
        }
      ]
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

