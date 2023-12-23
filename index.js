function createEmployeeRecord(infoArr) {

    return {
        firstName : infoArr[0],
        familyName : infoArr[1],
        title : infoArr[2],
        payPerHour : infoArr[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
}

function createEmployeeRecords(arrOfArr) {
    const arrOfObj = arrOfArr.map((arr) => {
        return createEmployeeRecord(arr)
    })
    return arrOfObj
}

// const stampDate = "YYYY-MM-DD HHMM"

function createTimeInEvent(stampDate) {
    const date = stampDate.slice(0,10)
    const hour = stampDate.slice(10,15)
    this.timeInEvents.push({
        type : "TimeIn",
        hour : Number(hour),
        date : date,
    })
    return this
}

function createTimeOutEvent(stampDate) {
    const date = stampDate.slice(0,10)
    const hour = stampDate.slice(10,15)
    this.timeOutEvents.push({
        type : "TimeOut",
        hour : Number(hour),
        date : date,
    })
    // console.log(this.timeOutEvents)
    return this
}


const theDate = "YYYY-MM-DD";

function hoursWorkedOnDate(theDate) {

    const inDate = this.timeInEvents.find((thatObj) => {
        return (thatObj.date === theDate)
    })
    const outDate = this.timeOutEvents.find((thatObj) => {
        return (thatObj.date === theDate)
    })

    return ((outDate.hour - inDate.hour)/100)
}

function wagesEarnedOnDate(theDate) {
    const record = this
    const work = hoursWorkedOnDate.call(record, theDate)
    return ( work * this.payPerHour )
    }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, theD) {
        return memo + wagesEarnedOnDate.call(this, theD)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? bcz we need to pass the current context value to the falllback

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
    return (srcArray.find((rec) => {
        return rec.firstName === firstName
    }))
}


function calculatePayroll(srcArray) {
    const pay = srcArray.reduce((accu, worker) => {
        return accu + allWagesFor.call(worker)
   
}, 0)
return pay
}