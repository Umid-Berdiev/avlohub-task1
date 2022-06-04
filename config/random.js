const { Category } = require("../models/workerModel");

module.exports = {
  randomString: function (string, count) {
    let randomName = "";
    let charactersLength = string.length;
    for (let i = 0; i < count; i++) {
      randomName += string.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomName;
  },
  randomCat: async function () {
    const randomNumbers = Math.floor(Math.random() * (6 - 0) + 0);
    const catList = await Category.find();
    // return catList;
    return catList[randomNumbers].id;
  },
  randomNumber: function (numbers) {
    const randomNumbers = Math.floor(Math.random() * numbers);
    return randomNumbers;
  },
  salaryGenerator: function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  },
  country: [
    "United States",
    "Canada",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
  ],
  username: [
    "Gary",
    "Albert",
    "Mildred",
    "Russell",
    "Laura",
    "Larry",
    "Michael",
    "Sara",
    "Phyllis",
  ],
  lastname: [
    "Craig",
    "Marie",
    "Jean",
    "Kimberly",
    "Heather",
    "Jason",
    "Juan",
    "Billy",
    "Fred",
    "Daniel",
    "Kelly",
    "Aaron",
    "Phillip",
    "Karen",
    "Nancy",
    "Theresa",
    "Howard",
    "Catherine",
    "Nicholas",
  ],
  year_born: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
  year_died: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
  price: [
    1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 12, 22, 32, 42, 52, 62, 72, 82,
    92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93, 4, 14, 24, 34, 44, 54, 64, 74,
    84, 94, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 6, 16, 26, 36, 46, 56, 66,
    76, 86, 96, 7, 17, 27, 37, 47, 57, 67, 77, 87, 97, 8, 18, 28, 38, 48, 58,
    68, 78, 88, 98, 9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 10, 20, 30, 40, 50,
    60, 70, 80, 90, 100,
  ],
  nationality: [
    "uzbek",
    "russion",
    "german",
    "english",
    "france",
    "kazak",
    "kirgiz",
    "tadjik",
    "indian",
    "japan",
  ],
  company: [
    "Google",
    "Amazon",
    "ePam",
    "Ubay",
    "Facebook",
    "Twitter",
    "Eurosoft",
    "Decore IT",
  ],
  workedYear: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  salary: [1000, 1500, 2000, 2500, 3000, 3500, 5000, 7000, 10000, 13000, 15000],
  bonus: [100, 200, 300, 400, 500, 1000],
  position: [
    "Marketolog",
    "Adminstarator",
    "Assistent",
    "Atr",
    "HR",
    "Moderator",
    "Internship",
    "Frontend developer",
    "Backend developer",
    "AI developer",
  ],
  specialties: ["student", "mentor", "driver", "accounter", "doctor", "chef"],
};
