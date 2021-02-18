export const getWidgets = () => {
  return {
    incomeWidgets: [
      {
        name: "Salary gross and net breakdown",
        selected: false,
      },
    ],
    budgetWidgets: [
      {
        name: "Budget allocated / remaining",
        selected: false,
      },
      {
        name: "Budget breakdown by category",
        selected: false,
      },
      {
        name: "Budget breakdown by item",
        selected: false,
      },
    ],
    expenditureWidgets: [
      {
        name: "Salary v Budget v Expenditure",
        selected: false,
      },
    ],
    trackerWidgets: [
      {
        name: "Tracker",
        selected: false,
      },
    ],
  };
};

export const getData = () => {
  const seedData = [
    {
      id: "1",
      saveName: "Julie",
      saveDate: "02/10/2020",
      description: "Julie salary budget",
      widgets: getWidgets(),
      data: {
        transactions: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            date: "07 - 02 - 2021",
            amount: 1.0,
          },
        ],
        budgetItems: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            frequency: "weekly",
            amount: 288.0,
            paid: true,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 51.57,
            paid: false,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 11.39,
            paid: false,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 150.0,
            paid: false,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 353.17,
            paid: false,
          },
          {
            amount: 28,
            category: "bills",
            frequency: "monthly",
            id: "fdf487aa-040a-4c91-9d34-e221e0ae5ffc",
            item: "school union naht",
          },
          {
            amount: 22.67,
            category: "car",
            frequency: "monthly",
            id: "921c8c21-515c-4cb3-bf7c-c740df5d02d8",
            item: "servicing",
          },
          {
            amount: 100,
            category: "car",
            frequency: "monthly",
            id: "df78edab-e316-49ea-ae8c-9f20aca86132",
            item: "petrol",
          },
          {
            amount: 60,
            category: "clothing",
            frequency: "monthly",
            id: "d88713f0-5f12-4381-bae4-e1c235b8af68",
            item: "clothes shoes",
          },
          {
            amount: 150,
            category: "entertainment",
            frequency: "weekly",
            id: "49b5acbe-1921-4219-8ee6-8c153ed08472",
            item: "eating out",
          },
          {
            amount: 57,
            category: "excercise",
            frequency: "monthly",
            id: "ad402800-0ca9-417d-9b24-9fd6e645a3fb",
            item: "gym",
          },
          {
            amount: 235.06,
            category: "financial",
            frequency: "monthly",
            id: "1c39a1e6-eb1d-4722-a6e8-1936e279e45d",
            item: "car loan",
          },
          {
            amount: 400,
            category: "financial",
            frequency: "monthly",
            id: "13a75aed-5b72-47ff-86b4-637d6a51257b",
            item: "savings",
          },
          {
            amount: 80,
            category: "health",
            frequency: "annually",
            id: "f6491402-4ccd-4af0-a572-50f469cfea5d",
            item: "prescriptions",
          },
        ],
        income: {
          annual: 63000.0,
          allowance: 12509.0,
          taxable: 50491.0,
          tax: 12698.2,
          ni: 5120.0,
          contributions: 21802.08,
          yearlyNet: 41197.92,
          monthlyNet: 3433.16,
          weeklyNet: 792.27,
        },
      },
    },
    {
      id: "2",
      saveName: "Neil",
      saveDate: "02/10/2020",
      description: "Neil salary budget",
      widgets: getWidgets(),
      data: {
        transactions: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            date: "07-02-2021",
            amount: 1.0,
          },
        ],
        budgetItems: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            frequency: "weekly",
            amount: 10.0,
            paid: false,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 10.0,
            paid: false,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 0.0,
            paid: false,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 40.0,
            paid: false,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 0.17,
            paid: false,
          },
        ],
        income: {
          annual: 15000.0,
          allowance: 0.0,
          taxable: 0.0,
          tax: 0.2,
          ni: 0.0,
          contributions: 0.0,
          yearlyNet: 15000.0,
          monthlyNet: 1250.0,
          weeklyNet: 288.46,
        },
      },
    },
    {
      id: "3",
      saveName: "Basic",
      saveDate: "02/10/2020",
      description: "Basic test figures",
      widgets: getWidgets(),
      data: {
        transactions: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            date: "07 - 02 - 2021",
            amount: 1.0,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            date: "07 - 02 - 2021",
            amount: 2.0,
            paid: false,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            date: "07 - 02 - 2021",
            amount: 3.0,
            paid: false,
          },
        ],
        budgetItems: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            frequency: "weekly",
            amount: 1.0,
            paid: false,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 2.0,
            paid: false,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 3.0,
            paid: false,
          },
        ],
        income: {
          annual: 100.0,
          allowance: 80.0,
          taxable: 20.0,
          tax: 5.0,
          ni: 5.0,
          contributions: 10.0,
          yearlyNet: 90.0,
          monthlyNet: 7.5,
          weeklyNet: 1.73,
        },
      },
    },
  ];

  //window.localStorage.setItem("EXPENSE-APP", JSON.stringify(seedData));
  const data = JSON.parse(window.localStorage.getItem("EXPENSE-APP"));

  //console.log({ data });
  return new Promise((resolve, reject) => {
    if (data !== undefined && data !== null) {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    } else {
      reject("Nope");
    }
  });
};

// function imgLoad(url) {
//   // Create new promise with the Promise() constructor;
//   // This has as its argument a function
//   // with two parameters, resolve and reject
//   return new Promise(function (resolve, reject) {
//     // Standard XHR to load an image
//     var request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.responseType = "blob";
//     // When the request loads, check whether it was successful
//     request.onload = function () {
//       if (request.status === 200) {
//         // If successful, resolve the promise by passing back the request response
//         resolve(request.response);
//       } else {
//         // If it fails, reject the promise with a error message
//         reject(
//           Error(
//             "Image didn't load successfully; error code:" + request.statusText
//           )
//         );
//       }
//     };
//     request.onerror = function () {
//       // Also deal with the case when the entire request fails to begin with
//       // This is probably a network error, so reject the promise with an appropriate message
//       reject(Error("There was a network error."));
//     };
//     // Send the request
//     request.send();
//   });
// }
// // Get a reference to the body element, and create a new image object
// var body = document.querySelector("body");
// var myImage = new Image();
// // Call the function with the URL we want to load, but then chain the
// // promise then() method on to the end of it. This contains two callbacks
// imgLoad("myLittleVader.jpg").then(
//   function (response) {
//     // The first runs when the promise resolves, with the request.response
//     // specified within the resolve() method.
//     var imageURL = window.URL.createObjectURL(response);
//     myImage.src = imageURL;
//     body.appendChild(myImage);
//     // The second runs when the promise
//     // is rejected, and logs the Error specified with the reject() method.
//   },
//   function (Error) {
//     console.log(Error);
//   }
// );

// function towerBuilder(nFloors) {
//   let tower = [];
//   let row = [];
//   let star = "*";
//   let space = " ";
//   for (let i = 1; i === nFloors; i++) {
//     for (let j = 0; j < nFloors - 1; j++) {
//       row.push(space);
//     }
//     for (let k = 0; k < i + 1; k++) {
//       row.push(star);
//     }
//     for (let j = 0; j < nFloors - 1; j++) {
//       row.push(space);
//     }

//     tower.push(String(row));
//   }
//   return tower;
// }

//#############################################################
// TODO:
// THINGS LEARNED:
// complex: destructuring of arrays, objects and objects arrays
// react-calendar
// moment.js
//
//#############################################################
