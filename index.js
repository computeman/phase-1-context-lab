/* Your Code Here */

// Creates an employee record object given an array of employee data
const createEmployeeRecord = function ([
  firstName,
  familyName,
  title,
  payPerHour,
]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
};

// Creates employee records for multiple employees using an array of employee data
const createEmployeeRecords = function (employeeData) {
  return employeeData.map(createEmployeeRecord);
};

// Adds a time-in event to an employee's timeInEvents array
const createTimeInEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  });

  return this;
};

// Adds a time-out event to an employee's timeOutEvents array
const createTimeOutEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  });

  return this;
};

// Calculates the hours worked by an employee on a specific date
const hoursWorkedOnDate = function (date) {
  const timeInEvent = this.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

  return hoursWorked;
};

// Calculates the wages earned by an employee on a specific date
const wagesEarnedOnDate = function (date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  const wagesEarned = hoursWorked * this.payPerHour;

  return wagesEarned;
};

// Calculates the total payroll for all employees in the given employeeRecords array
const calculatePayroll = function (employeeRecords) {
  const totalPayroll = employeeRecords.reduce(function (total, employee) {
    return (
      total +
      employee.timeInEvents.reduce(function (payable, event) {
        return payable + wagesEarnedOnDate.call(employee, event.date);
      }, 0)
    );
  }, 0);

  return totalPayroll;
};

// Finds an employee by their first name in the given collection
function findEmployeeByFirstName(collection, firstName) {
  return collection.find((employee) => employee.firstName === firstName);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// Calculates the total wages earned by an employee for all dates
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
