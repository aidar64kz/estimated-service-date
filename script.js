Date.prototype.addDays = function (estimatedServiceDayTS) {
    var estimatedDay = new Date(this.valueOf());
    estimatedDay.setDate(estimatedDay.getDate() + estimatedServiceDayTS);
    return estimatedDay;
}

function sendEmail(day, nxtServiceDate) {
    if (day <= 30) {
        if (confirm("send an offer to the user")) {
            Email.send({
                SecureToken: "223b1791-b478-481b-9898-dd44c7affe34",
                To: 'aydar.aukenov@gmail.com',
                From: "aydar.aukenov@gmail.com",
                Subject: "ELASTIC EMAIL",
                Body: "<html><h2>Helloo</h2><strong>YOU HAVE TO VISIT YOUR CAR REAPAIR SERVICE BEFORE " + nxtServiceDate + " </strong><br></br><em>Italic</em></html>"
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
    return {nextServiceDate: nextServiceDate, estimatedServiceDayTS: estimatedServiceDayTS};
}

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

    document.getElementById('estimated').innerHTML = "Your next estimated service time is " + formattedNxtServiceDate;
    sendEmail(serviceObj.estimatedServiceDayTS, formattedNxtServiceDate);
}



