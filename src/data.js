export const getData = () => {
  const data = [
    {
      id: "1",
      saveName: "Julie",
      saveDate: "02/10/2020",
      description: "Julie salary budget",
      data: {
        budgetItems: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            frequency: "weekly",
            amount: 288.0,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 51.57,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 11.39,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 150.0,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 353.17,
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
      data: {
        budgetItems: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            frequency: "weekly",
            amount: 10.0,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 10.0,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 0.0,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 40.0,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 0.17,
          },
        ],
        income: {
          annual: 15000.0,
          allowance: 0.0,
          taxable: 0.0,
          tax: 0.2,
          ni: 0.0,
          contributions: 0.0,
          yearlyNet: 150000.0,
          monthlyNet: 0.0,
          weeklyNet: 0.0,
        },
      },
    },
    {
      id: "3",
      saveName: "Basic",
      saveDate: "02/10/2020",
      description: "Basic test figures",
      data: {
        budgetItems: [
          {
            id: 1,
            category: "accommodation",
            item: "rent",
            frequency: "weekly",
            amount: 10.0,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 10.0,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 0.0,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 40.0,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 0.17,
          },
        ],
        income: {
          annual: 100.0,
          allowance: 80.0,
          taxable: 20.0,
          tax: 10.0,
          ni: 10.0,
          contributions: 20.0,
          yearlyNet: 0.0,
          monthlyNet: 0.0,
          weeklyNet: 0.0,
        },
      },
    },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
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
