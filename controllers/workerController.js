const _ = require("underscore");
const { Category, Worker } = require("../models/workerModel");

const {
  randomNumber,
  randomString,
  country,
  username,
  year_born,
  year_died,
  nationality,
  price,
  company,
  workedYear,
  salaryGenerator,
  specialties,
  lastname,
  randomCat,
} = require("../config/random");

const ObjectId = require("mongodb").ObjectId;

exports.createRandomWorkers = async (req, res) => {
  // return res.json({ randCat });
  const count = 100000;
  const recursion = async (RECURSION_NUMBER) => {
    if (RECURSION_NUMBER > 0) {
      const randCat = await randomCat();

      const result = new Worker({
        category: randCat,
        name: _.sample(username) + " " + _.sample(lastname),
        count: randomNumber(100),
        views: randomNumber(1000),
        ball: [
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
          randomNumber(20),
        ],
        country: _.sample(country),
        company: _.sample(company),
        workedYear: _.sample(workedYear),
        salary: {
          january: salaryGenerator(10000, 100000), // random (10000 - 100000)
          february: salaryGenerator(10000, 100000), // random (10000 - 100000)
          march: salaryGenerator(10000, 100000), // random (10000 - 100000)
          april: salaryGenerator(10000, 100000), // random (10000 - 100000)
          may: salaryGenerator(10000, 100000), // random (10000 - 100000)
          june: salaryGenerator(10000, 100000), // random (10000 - 100000)
        },
        bonus: {
          january: salaryGenerator(100, 1000), // random (100 - 1000)
          february: salaryGenerator(100, 1000), // random (100 - 1000)
          march: salaryGenerator(100, 1000), // random (100 - 1000)
          april: salaryGenerator(100, 1000), // random (100 - 1000)
          may: salaryGenerator(100, 1000), // random (100 - 1000)
          june: salaryGenerator(100, 1000), // random (100 - 1000)
        },
        year_born: _.sample(year_born),
        year_died: _.sample(year_died),
        specialty: _.sample(specialties),
      });

      await result.save();
      // console.log("Saved", result);

      recursion(RECURSION_NUMBER - 1);
    }
  };

  recursion(count);

  res.json("success");
};

exports.createRandomCategories = async (req, res) => {
  const categoryA = new Category({
    title: "A",
  });
  categoryA.save();
  const categoryB = new Category({
    title: "B",
  });
  categoryB.save();
  const categoryC = new Category({
    title: "C",
  });
  categoryC.save();
  const categoryD = new Category({
    title: "D",
  });
  categoryD.save();
  const categoryE = new Category({
    title: "E",
  });
  categoryE.save();
  const categoryF = new Category({
    title: "F",
  });
  categoryF.save();
  res.json("success");
};

exports.filterWorkers = async (req, res) => {
  const { year } = req.query;
  const pipeline = [
    {
      $match: {
        workedYear: parseInt(year),
      },
    },
    {
      $project: {
        workedYear: 1,
        name: 1,
        salaryTotal: {
          $sum: [
            "$salary.january",
            "$salary.february",
            "$salary.march",
            "$salary.april",
            "$salary.may",
            "$salary.june",
          ],
        },
      },
    },
    {
      $sort: {
        salaryTotal: -1,
      },
    },
    {
      $limit: 10,
    },
  ];

  const result = await Worker.aggregate(pipeline);
  res.json(result);
};

exports.filterWorkers2 = async (req, res) => {
  const { country, category, year } = req.query;
  const pipeline = [
    {
      $match: {
        title: category,
      },
    },

    {
      $lookup: {
        from: "workers",
        localField: "_id",
        foreignField: "category",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$country", country],
                  },
                  {
                    $eq: ["$workedYear", parseInt(year)],
                  },
                ],
              },
            },
          },
          // {
          //   $project: {
          //     name: 1,
          //     country: 1,
          //     workedYear: 1,
          //     bonusTotal: {
          //       $sum: [
          //         "$bonus.january",
          //         "$bonus.february",
          //         "$bonus.march",
          //         "$bonus.april",
          //         "$bonus.may",
          //         "$bonus.june",
          //       ],
          //     },
          //   },
          // },
          {
            $group: {
              _id: null,
              soni: {
                $sum: 1,
              },
              output: {
                $push: {
                  name: "$name",
                  country: "$country",
                  workedYear: "$workedYear",
                  bonusTotal: {
                    $sum: [
                      "$bonus.january",
                      "$bonus.february",
                      "$bonus.march",
                      "$bonus.april",
                      "$bonus.may",
                      "$bonus.june",
                    ],
                  },
                },
              },
            },
          },
        ],
        as: "workers",
      },
    },
  ];

  const result = await Category.aggregate(pipeline);
  res.json(result);
};

exports.filterWorkers3 = async (req, res) => {
  const pipeline = [
    {
      $match: {
        company: "Facebook",
      },
    },
    {
      $project: {
        name: 1,
        company: 1,
        ballTotal: {
          $sum: "$ball",
        },
        salaryTotal: {
          $sum: [
            "$salary.january",
            "$salary.february",
            "$salary.march",
            "$salary.april",
            "$salary.may",
            "$salary.june",
          ],
        },
      },
    },
    {
      $match: {
        ballTotal: {
          $lt: 130,
        },
      },
    },
    {
      $sort: {
        salaryTotal: -1,
      },
    },
    {
      $limit: 1,
    },
  ];

  const result = await Worker.aggregate(pipeline);
  res.json(result);
};

exports.filterWorkers4 = async (req, res) => {
  const { category } = req.query;
  const pipeline = [
    {
      $match: {
        title: category,
      },
    },
    {
      $lookup: {
        from: "workers",
        localField: "_id",
        foreignField: "category",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $in: ["$company", ["Facebook", "Amazon"]],
                  },
                  // { $eq: ["$workedYear", parseInt(year)] },
                ],
              },
            },
          },
          {
            $project: {
              company: 1,
              name: 1,
              bonusTotal: {
                $sum: [
                  "$bonus.january",
                  "$bonus.february",
                  "$bonus.march",
                  "$bonus.april",
                  "$bonus.may",
                  "$bonus.june",
                ],
              },
            },
          },
          {
            $bucket: {
              groupBy: "$bonusTotal",
              boundaries: [2000, 2500, 3000, 3500, 4000, 4500],
              default: "Other",
              output: {
                // natijani chiqarish
                count: {
                  $sum: 1,
                },
                bonusOwners: {
                  $push: {
                    name: "$name",
                    bonusTotal: "$bonusTotal",
                  },
                },
              },
            },
          },
        ],
        as: "workers",
      },
    },
  ];

  const result = await Category.aggregate(pipeline);
  res.json(result);
};

exports.filterWorkers5 = async (req, res) => {
  const { companies } = req.query;
  console.log({
    companies,
  });
  const pipeline = [
    {
      $match: {
        $expr: {
          $and: [
            {
              $in: ["$company", companies],
            },
            {
              $eq: ["$specialty", "mentor"],
            },
          ],
        },
      },
    },
    {
      $project: {
        name: 1,
        company: 1,
        salaryTotal: {
          $sum: [
            "$salary.january",
            "$salary.february",
            "$salary.march",
            "$salary.april",
            "$salary.may",
            "$salary.june",
          ],
        },
      },
    },
    {
      $sort: {
        salaryTotal: -1,
      },
    },
    {
      $group: {
        _id: "$company",
        worker: {
          $push: {
            name: "$name",
            salary: "$salaryTotal",
          },
        },
      },
    },
  ];

  const result = await Worker.aggregate(pipeline);
  res.json(result);
};

exports.filterWorkers6 = async (req, res) => {
  const { country } = req.query;
  const pipeline = [
    {
      $facet: {
        by_january: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$country", country],
                  },
                  {
                    $in: ["$specialty", ["driver", "doctor"]],
                  },
                ],
              },
            },
          },
          {
            $project: {
              name: 1,
              country: 1,
              specialty: 1,
              "salary.january": 1,
            },
          },
          {
            $sort: {
              "salary.january": 1,
            },
          },
          {
            $limit: 1,
          },
        ],
        by_march: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$country", country],
                  },
                  {
                    $in: ["$specialty", ["driver", "doctor"]],
                  },
                ],
              },
            },
          },
          {
            $project: {
              name: 1,
              country: 1,
              specialty: 1,
              "salary.march": 1,
            },
          },
          {
            $sort: {
              "salary.march": 1,
            },
          },
          {
            $limit: 1,
          },
        ],
      },
    },
  ];

  const result = await Worker.aggregate(pipeline);
  res.json(result);
};
