const structure = {
  address: {
    building: "1007",
    coord: [-73.856077, 40.848447],
    street: "Morris Park Ave",
    zipcode: "10462",
  },
  borough: "Bronx",
  cuisine: "Bakery",
  grades: [
    { date: { $date: 1393804800000 }, grade: "A", score: 2 },
    { date: { $date: 1378857600000 }, grade: "A", score: 6 },
    { date: { $date: 1358985600000 }, grade: "A", score: 10 },
    { date: { $date: 1322006400000 }, grade: "A", score: 9 },
    { date: { $date: 1299715200000 }, grade: "B", score: 14 },
  ],
  name: "Morris Park Bake Shop",
  restaurant_id: "30075445",
};
let db;
// Q1 :  Write a MongoDB query to display all the documents in the collection restaurants.

db.restaurant.find({});

//Q2 : Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
db.restaurant.find(
  {},
  { _id: 0, restaurant_id: 1, cuisine: 1, name: 1, borough: 1 }
);

//Q3 : Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine, but exclude the field _id for all the documents in the collection restaurant.
db.restaurant.find(
  {},
  { _id: 0, restaurant_id: 1, cuisine: 1, name: 1, borough: 1 }
);
//Q4 Write a MongoDB query to display the fields restaurant_id, name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
db.restaurant.find(
  {},
  { _id: 0, name: 1, borough: 1, "address.zipcode": 1, restaurant_id: 1 }
);

//Q5 :  Write a MongoDB query to display all the restaurant which is in the borough Bronx.
db.restaurant.find({ borough: "Bronx" });

//Q6 : Write a MongoDB query to display the first 5 restaurant which is in the borough Bronx.
db.restaurant.find({ borough: "Bronx" }).limit(5);

//Q7 :Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
db.restaurant.find({ borough: "Bronx" }).skip(5).limit(5);

//Q8 : Write a MongoDB query to find the restaurants who achieved a score more than 90.
db.restaurant.find({ grades: { $elemMatch: { score: { $gt: 90 } } } });

//Q9: Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
db.restaurant.find({
  grades: { $elemMatch: { score: { $gt: 80, $lt: 100 } } },
});

//Q10 : Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
db.restaurant.find({ "address.coord.0": { $lt: -95.754168 } });

//Q11 : Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and their grade score more than 70 and latitude less than -65.754168.

db.restaurant.find({
  $and: [
    { cuisine: { $ne: "American " } }, //American in db is saved as "American "
    { grades: { $elemMatch: { score: { $gt: 70 } } } },
    { "address.coord.0": { $lt: -65.754168 } },
  ],
});

//Q12 : Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168.
//Note : Do this query without using $and operator.

db.restaurant.find({
  cuisine: { $ne: "American " },
  "grades.score": { $gt: 70 },
  "address.coord.0": { $lt: -65.754168 },
});

//Q13 : Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
db.restaurant.find({
  $and: [
    { cuisine: { $ne: "American " } },
    { "grades.grade": "A" },
    { borough: { $ne: "Brooklyn" } },
  ],
});

//Q14 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
db.restaurant.find(
  { name: /^Wil/ },
  {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    cuisine: 1,
  }
);

//Q15 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
db.restaurant.find(
  { name: /ces$/ },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

//Q16 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
db.restaurant.find(
  { name: /.*Reg.*/ },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

//Q17 : Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
db.restaurant.find({
  $and: [
    { borough: "Bronx" },
    { $or: [{ cuisine: "American " }, { cuisine: "Chinese" }] },
  ],
});

db.restaurant.find({
  $and: [{ borough: "Bronx" }, { cuisine: { $in: ["American ", "Chinese"] } }],
});

//Q18 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronx or Brooklyn.
db.restaurant.find(
  {
    borough: { $in: ["Staten Island", "Queens", "Brooklyn"] },
  },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

//Q19 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
db.restaurant.find(
  {
    borough: { $nin: ["Staten Island", "Queens", "Brooklyn"] },
  },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

//Q20 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
db.restaurant.find(
  { grades: { $elemMatch: { score: { $lt: 10 } } } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1, grades: 1 }
);

//Q21 : Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.
db.restaurant.find(
  {
    $or: [
      { cuisine: { $nin: ["American ", "Chinese"] } },
      { name: { $regex: /^Wil/ } },
    ],
  },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

//Q22 : Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..
db.restaurant.find(
  {
    $and: [
      { grades: { $elemMatch: { grade: "A" } } },
      { grades: { $elemMatch: { score: 11 } } },
      { grades: { $elemMatch: { date: ISODate("2014-08-11T00:00:00Z") } } },
    ],
  },
  { restaurant_id: 1, name: 1, grades: 1 }
);

db.restaurant.find(
  {
    "grades.date": ISODate("2014-08-11T00:00:00Z"),
    "grades.grade": "A",
    "grades.score": 11,
  },
  { restaurant_id: 1, name: 1, grades: 1 }
);

//Q23 : Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".
db.restaurant.find(
  {
    "grades.1.date": ISODate("2014-08-11T00:00:00Z"),
    "grades.1.grade": "A",
    "grades.1.score": 9,
  },
  { restaurant_id: 1, name: 1, grades: 1 }
);

//Q24 : Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..
db.restaurant.find(
  { "address.coord.1": { $lte: 52, $gt: 42 } },
  { _id: 0, restaurant_id: 1, name: 1, address: 1 }
);

//Q25 : Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
db.restaurant.find({}).sort({ name: 1 });

//Q26 : Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.
db.restaurant.find({}).sort({ name: -1 });

//Q27 : Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
db.restaurant.find({}).sort({ cuisine: 1, borough: -1 });

//Q28 : Write a MongoDB query to know whether all the addresses contains the street or not.
db.restaurant.find({ "address.street": { $exists: false } }).count();

//Q29 : Write a MongoDB query which will select all documents in the restaurants collection where the coord field value is Double.
db.restaurant.find({ "address.coord": { $type: 1 } });

//Q30 :  Write a MongoDB query which will select the restaurant Id, name and grades for those restaurants which returns 0 as a remainder after dividing the score by 7.
db.restaurant.find(
  { "grades.score": { $mod: [7, 0] } },
  { restaurant_id: 1, name: 1, grades: 1 }
);

//Q31 : Write a MongoDB query to find the restaurant name, borough, longitude and attitude and cuisine for those restaurants which contains 'mon' as three letters somewhere in its name.
db.restaurant.find(
  { name: { $regex: /.*mon.*/ } },
  { _id: 0, name: 1, borough: 1, cuisine: 1, "address.coord": 1 }
);

//Q32 : Write a MongoDB query to find the restaurant name, borough, longitude and latitude and cuisine for those restaurants which contain 'Mad' as first three letters of its name.
db.restaurant.find(
  { name: { $regex: /^Mad/ } },
  { _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine: 1 }
);

//Q33 : Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
db.restaurant.find({ grades: { $elemMatch: { score: { $lt: 5 } } } });

//Q34 : Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan.
db.restaurant.find({
  $and: [
    { grades: { $elemMatch: { score: { $lt: 5 } } } },
    { borough: "Manhattan" },
  ],
});

//Q35 : Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn.
db.restaurant.find({
  $and: [
    { grades: { $elemMatch: { score: { $lt: 5 } } } },
    { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
  ],
});

//Q36 : Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
db.restaurant.find({
  $and: [
    { grades: { $elemMatch: { score: { $lt: 5 } } } },
    { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
    { cuisine: { $ne: "American " } },
  ],
});

//Q37 : Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
db.restaurant.find({
  $and: [
    { grades: { $elemMatch: { score: { $lt: 5 } } } },
    { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
    {
      $and: [
        { cuisine: { $ne: "American " } },
        { cuisine: { $ne: "Chinese" } },
      ],
    },
  ],
});

//Q38 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
db.restaurant.find({
  $and: [
    { grades: { $elemMatch: { score: 6 } } },
    { grades: { $elemMatch: { score: 2 } } },
  ],
});

//Q39 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
db.restaurant.find({
  $and: [
    { "grades.score": 2 },
    { "grades.score": 6 },
    { borough: "Manhattan" },
  ],
});

//Q40 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
db.restaurant.find({
  $and: [
    { "grades.score": 2 },
    { "grades.score": 6 },
    { borough: { $in: ["Manhattan", "Brooklyn"] } },
  ],
});

//Q41 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
db.restaurant.find({
  $and: [
    { "grades.score": 2 },
    { "grades.score": 6 },
    { borough: { $in: ["Manhattan", "Brooklyn"] } },
    { cuisine: { $ne: "American " } },
  ],
});

//Q42 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
db.restaurant.find({
  $and: [
    { "grades.score": 2 },
    { "grades.score": 6 },
    { borough: { $in: ["Manhattan", "Brooklyn"] } },
    {
      $and: [
        { cuisine: { $ne: "American " } },
        { cuisine: { $ne: "Chinese" } },
      ],
    },
  ],
});

//Q43 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.
db.restaurant.find({
  $or: [{ "grades.score": 2 }, { "grades.score": 6 }],
});

//Q44 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan.
db.restaurant.find({
  $and: [
    { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
    { borough: "Manhattan" },
  ],
});

//Q45 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
db.restaurant.find({
  $and: [
    { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
    { borough: { $in: ["Manhattan", "Brooklyn"] } },
  ],
});

//Q46 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
db.restaurant.find({
  $and: [
    { $or: [{ "grades.score": 2 }, { "grades.score": 6 }] },
    {
      $or: [{ borough: "Manhattan" }, { Borough: "Brooklyn" }],
    },
    { cuisine: { $ne: "American " } },
  ],
});

//47 : Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
db.restaurant.find({
  $and: [
    { $or: [{ "grades.score": 2 }, { grades: 6 }] },
    { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
    {
      $or: [{ cuisine: { $ne: "American " } }, { cuisine: { $ne: "Chinese" } }],
    },
  ],
});

//Q48 : Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
db.restaurant.find({
  grades: { $not: { $elemMatch: { score: { $lte: 5 } } } },
});

//Q49 : Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan.
db.restaurant.find({
  $and: [
    { grades: { $not: { $elemMatch: { score: { $lte: 5 } } } } },
    { borough: "Manhattan" },
  ],
});

//Q50 : Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan or Brooklyn.
db.restaurant.find({
  $and: [
    { grades: { $not: { $elemMatch: { score: { $lte: 5 } } } } },
    { $or: [{ borough: "Manhattan" }, { borough: "Brooklyn" }] },
  ],
});

//Q51 : Write a MongoDB query to find the average score for each restaurant.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$name", avgScore: { $avg: "$grades.score" } } },
]);

//Q52 : Write a MongoDB query to find the highest score for each restaurant.
db.restaurant.aggregate([
  {
    $unwind: "$grades",
  },
  {
    $group: { _id: "$name", maxScore: { $max: "$grades.score" } },
  },
]);

//Q53 : Write a MongoDB query to find the lowest score for each restaurant.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$name", lowScore: { $min: "$grades.score" } } },
]);

//Q54 : Write a MongoDB query to find the count of restaurants in each borough.
db.restaurant.aggregate([{ $group: { _id: "$borough", count: { $sum: 1 } } }]);

//Q55 : Write a MongoDB query to find the count of restaurants for each cuisine.
db.restaurant.aggregate([{ $group: { _id: "$cuisine", count: { $sum: 1 } } }]);

//Q56 : Write a MongoDB query to find the count of restaurants for each cuisine and borough.
db.restaurant.aggregate([
  { $group: { _id: ["$cuisine", "$borough"], count: { $sum: 1 } } },
]);

//Q57 : Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $match: { "grades.grade": "A" } },
  { $group: { _id: "$cuisine", count: { $sum: 1 } } },
]);

//Q58 : Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each borough.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $match: { "grades.grade": "A" } },
  { $group: { _id: "$borough", count: { $sum: 1 } } },
]);

//Q59 : Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine and borough.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $match: { "grades.grade": "A" } },
  { $group: { _id: ["$cuisine", "$borough"], count: { $sum: 1 } } },
]);

//Q60 : Write a MongoDB query to find the number of restaurants that have been graded in each month of the year.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  {
    $project: {
      month: { $month: { $toDate: "$grades.date" } },
      year: { $year: { $toDate: "$grades.date" } },
    },
  },
  { $group: { _id: { month: "$month", year: "$year" }, count: { $sum: 1 } } },
  { $sort: { "_id.year": 1, "_id.month": 1 } },
]);

//Q61 : Write a MongoDB query to find the average score for each cuisine.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$cuisine", avgScore: { $avg: "$grades.score" } } },
]);

//Q62 : Write a MongoDB query to find the highest score for each cuisine.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$cuisine", highScore: { $max: "$grades.score" } } },
]);

//Q63 : Write a MongoDB query to find the lowest score for each cuisine.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$cuisine", minScore: { $min: "$grades.score" } } },
]);

//Q64 : Write a MongoDB query to find the average score for each borough.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$borough", avgScore: { $avg: "$grades.score" } } },
]);

//Q65 : Write a MongoDB query to find the highest score for each borough.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$borough", highScore: { $max: "$grades.score" } } },
]);

//Q66 : Write a MongoDB query to find the lowest score for each borough.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$borough", minScore: { $min: "$grades.score" } } },
]);

//Q67 : Write a MongoDB query to find the name and address of the restaurants that received a grade of 'A' on a specific date.
db.restaurant.aggregate([{ $ }]);

//Q68 : Write a MongoDB query to find the name and address of the restaurants that received a grade of 'B' or 'C' on a specific date.

//Q69 : Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and one 'B' grade.
db.restaurant.find(
  { $and: [{ "grades.grade": "A" }, { "grades.grade": "B" }] },
  { _id: 0, name: 1, address: 1 }
);

//Q70 : Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and no 'B' grades
db.restaurant.find(
  { $and: [{ "grades.grade": "A" }, { "grades.grade": { $ne: "B" } }] },
  { _id: 0, name: 1, address: 1 }
);

//Q71 : Write a MongoDB query to find the name ,address and grades of the restaurants that have at least one 'A' grade and no 'C' grades.
db.restaurant.find(
  { $and: [{ "grades.grade": "A" }, { "grades.grade": { $ne: "C" } }] },
  { _id: 0, name: 1, address: 1, "grades.grade": 1 }
);

//Q72 : Write a MongoDB query to find the name, address, and grades of the restaurants that have at least one 'A' grade, no 'B' grades, and no 'C' grades.
db.restaurant.find(
  {
    $and: [
      { "grades.grade": "A" },
      { "grades.grade": { $not: { $eq: "B" } } },
      { "grades.grade": { $not: { $eq: "C" } } },
    ],
  },
  { _id: 0, name: 1, address: 1, "grades.grade": 1 }
);

//Q73 : Write a MongoDB query to find the name and address of the restaurants that have the word 'coffee' in their name.
db.restaurant.find(
  { name: { $regex: /coffee/i } },
  { _id: 0, name: 1, address: 1 }
);

//Q74 : Write a MongoDB query to find the name and address of the restaurants that have a zipcode that starts with '10'.
db.restaurant.find(
  { "address.zipcode": { $regex: /^10/ } },
  { _id: 0, name: 1, address: 1 }
);

//Q75 : Write a MongoDB query to find the name and address of the restaurants that have a cuisine that starts with the letter 'B'.
db.restaurant.find(
  { cuisine: { $regex: /^B/i } },
  { _id: 0, name: 1, address: 1, cuisine: 1 }
);

//Q76 : Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that ends with the letter 'y'.
db.restaurant.find(
  { cuisine: { $regex: /y$/i } },
  { _id: 0, name: 1, address: 1, cuisine: 1 }
);

//Q77 : Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that contains the word 'Pizza'.
db.restaurant.find(
  { cuisine: { $regex: /Pizza/i } },
  { _id: 0, name: 1, address: 1, cuisine: 1 }
);

//Q78 : Write a MongoDB query to find the restaurants achieved highest average score.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $group: { _id: "$restaurant_id", avgScore: { $avg: "$grades.score" } } },
  { $sort: { avgScore: -1 } },
  { $limit: 1 },
]);

//Q79 : Write a MongoDB query to find all the restaurants with the highest number of "A" grades.
db.restaurant.aggregate([
  { $unwind: "$grades" },
  { $match: { "grades.grade": "A" } },
  { $group: { _id: "restaurant_id", count: { $sum: 1 } } },
]);
