
// This function 
Date.prototype.addDays = function (estimatedServiceDayTS) {
    var estimatedDay = new Date(this.valueOf());
    estimatedDay.setDate(estimatedDay.getDate() + estimatedServiceDayTS);
    return estimatedDay;
}
// 2) If date is less than 30 days message "offer to the user" will be shown. If the estimated date is more than 30 days - message: "Happy riding!" will show-up
// User continues by cliking on OK or Cancel.
function sendEmail(day, nxtServiceDate) {
    if (day <= 30) {
        if (confirm("send an offer to the user")) {
            Email.send({
                SecureToken: "223b1791-b478-481b-9898-dd44c7affe34", //Elastic-Email (SMTP) secure token
                To: 'aydar.aukenov@gmail.com',  //Customer's e-mail should be insterted here (You can also put here your e-mail here to test it)
                From: "aydar.aukenov@gmail.com",
                Subject: "Next Service Date Estimation",
                Body: "<html><h2>Helloo</h2><strong>YOU HAVE TO VISIT YOUR CAR REAPAIR SERVICE BEFORE " + nxtServiceDate + " </strong><br></br><em>Italic</em></html>" // This message will be sent to customer
            }).then(
                alert("mail sent successfully")
            );
        }
    }
    else {
        alert("Happy riding");
    }
}

function getNextServiceObj(lastDateTS, currentDateTS, lastMileage, currentMileage) {
    var diffTime = Math.abs(currentDateTS - lastDateTS);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var mileageDifference = currentMileage - lastMileage;
    var averageConsumption = mileageDifference / diffDays;
    var estimatedServiceDayTS = (15000 - mileageDifference) / averageConsumption;
    var nextServiceDate = currentDateTS.addDays(estimatedServiceDayTS);
    return { nextServiceDate: nextServiceDate, estimatedServiceDayTS: estimatedServiceDayTS };
}
// 1) When clicking on submit button it first prevents the page from refreshing and counts the average consumption per day and estimated time to go the service.

function estimatedDate() {
    document.getElementById("form").addEventListener('submit', function (event) {
        event.preventDefault();
    });

    var lastDate = document.getElementById("last__date").value;
    var currentDate = Date.now();
    var lastDateTS = new Date(lastDate);
    var currentDateTS = new Date(currentDate);
    var lastMileage = document.getElementById("last__mileage").value;
    var currentMileage = document.getElementById("current__mileage").value;
    if (currentMileage < lastMileage) {
        alert("Current mileage should be higher than the last mileage!");
        return false;
    }
    var serviceObj = getNextServiceObj(lastDateTS, currentDateTS, lastMileage, currentMileage);
    var nextServiceDate = serviceObj.nextServiceDate;
    var formattedNxtServiceDate = nextServiceDate.getFullYear() + '-' + (nextServiceDate.getMonth() + 1) + '-' + nextServiceDate.getDate();

    document.getElementById('estimated').innerHTML = "Your next estimated service time is " + formattedNxtServiceDate; //This message will be shown on the main screen at the bottom where h2 tag with estimated id is placed
    sendEmail(serviceObj.estimatedServiceDayTS, formattedNxtServiceDate);
}



