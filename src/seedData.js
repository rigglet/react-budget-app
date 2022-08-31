export function seedData() {
  const data = {};

  data.showBudgets = function () {
    return this.budgets;
  };

  data.getLocalData = function (localName = "EXPENSE-APP") {
    //return data "EXPENSE-APP"
    const localData = JSON.parse(window.localStorage.getItem(localName));

    //console.log({ data });
    return new Promise((resolve, reject) => {
      if (localData !== undefined && localData !== null) {
        setTimeout(() => {
          resolve(localData);
        }, 500);
      } else {
        reject("Nope");
      }
    });
  };

  data.setData = function (localName = "EXPENSE-APP") {
    //store data locally
    //"EXPENSE-APP" by default
    window.localStorage.setItem(localName, JSON.stringify(this.budgets));
  };

  data.getWidgets = function () {
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

  //main data
  data.budgets = [
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
            paid: false,
            mandatory: false,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 51.57,
            paid: false,
            mandatory: false,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 11.39,
            paid: false,
            mandatory: false,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 150.0,
            paid: false,
            mandatory: false,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 353.17,
            paid: false,
            mandatory: false,
          },
          {
            amount: 28,
            category: "bills",
            frequency: "monthly",
            id: "fdf487aa-040a-4c91-9d34-e221e0ae5ffc",
            item: "school union naht",
            paid: false,
            mandatory: false,
          },
          {
            amount: 22.67,
            category: "car",
            frequency: "monthly",
            id: "921c8c21-515c-4cb3-bf7c-c740df5d02d8",
            item: "servicing",
            paid: false,
            mandatory: false,
          },
          {
            amount: 100,
            category: "car",
            frequency: "monthly",
            id: "df78edab-e316-49ea-ae8c-9f20aca86132",
            item: "petrol",
            paid: false,
            mandatory: false,
          },
          {
            amount: 60,
            category: "clothing",
            frequency: "monthly",
            id: "d88713f0-5f12-4381-bae4-e1c235b8af68",
            item: "clothes shoes",
            paid: false,
            mandatory: false,
          },
          {
            amount: 150,
            category: "entertainment",
            frequency: "weekly",
            id: "49b5acbe-1921-4219-8ee6-8c153ed08472",
            item: "eating out",
            paid: false,
            mandatory: false,
          },
          {
            amount: 57,
            category: "excercise",
            frequency: "monthly",
            id: "ad402800-0ca9-417d-9b24-9fd6e645a3fb",
            item: "gym",
            paid: false,
            mandatory: false,
          },
          {
            amount: 235.06,
            category: "financial",
            frequency: "monthly",
            id: "1c39a1e6-eb1d-4722-a6e8-1936e279e45d",
            item: "car loan",
            paid: false,
            mandatory: false,
          },
          {
            amount: 400,
            category: "financial",
            frequency: "monthly",
            id: "13a75aed-5b72-47ff-86b4-637d6a51257b",
            item: "savings",
            paid: false,
            mandatory: false,
          },
          {
            amount: 80,
            category: "health",
            frequency: "annually",
            id: "f6491402-4ccd-4af0-a572-50f469cfea5d",
            item: "prescriptions",
            paid: false,
            mandatory: false,
          },
        ],
        income: {
          annualGross: 0,
          taxFreeAllowance: 0,
          taxable: 0,
          incomeTax: 0,
          nationalInsurance: 0,
          totalDeductions: 0,
          annualNet: 0,
          monthlyNet: 0,
          weeklyNet: 0,
          // annual: 63000.0,
          // allowance: 12509.0,
          // taxable: 50491.0,
          // tax: 12698.2,
          // ni: 5120.0,
          // contributions: 21802.08,
          // yearlyNet: 41197.92,
          // monthlyNet: 3433.16,
          // weeklyNet: 792.27,
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
            mandatory: false,
          },
          {
            id: 2,
            category: "bills",
            item: "phone",
            frequency: "monthly",
            amount: 10.0,
            paid: false,
            mandatory: false,
          },
          {
            id: 3,
            category: "bills",
            item: "council tax",
            frequency: "monthly",
            amount: 0.0,
            paid: false,
            mandatory: false,
          },
          {
            id: 4,
            category: "car",
            item: "tax",
            frequency: "annually",
            amount: 40.0,
            paid: false,
            mandatory: false,
          },
          {
            id: 5,
            category: "car",
            item: "insurance",
            frequency: "annually",
            amount: 0.17,
            paid: false,
            mandatory: false,
          },
        ],
        income: {
          annualGross: 0,
          taxFreeAllowance: 0,
          taxable: 0,
          incomeTax: 0,
          nationalInsurance: 0,
          totalDeductions: 0,
          annualNet: 0,
          monthlyNet: 0,
          weeklyNet: 0,
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
          annualGross: 0,
          taxFreeAllowance: 0,
          taxable: 0,
          incomeTax: 0,
          nationalInsurance: 0,
          totalDeductions: 0,
          annualNet: 0,
          monthlyNet: 0,
          weeklyNet: 0,
        },
      },
    },
  ];

  return data;
}

//widgets
const getWidgets = () => {
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
