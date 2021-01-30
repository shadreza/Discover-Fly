var doubleFare=0;
if(doubleFare==0){
    document.getElementById('doubleFareNotification').style.display='none';
}
document.getElementById('popupBox').style.display='none';
function showMessage(message){
    document.getElementById('popupBoxMessage').innerText=message;
    document.getElementById('popupBox').style.display='block';
}
var firstClassFarePerSeat = parseFloat(document.getElementById('firstClassFarePerSeat').innerText);
var economyClassFarePerSeat = parseFloat(document.getElementById('economyClassFarePerSeat').innerText);
function updatingSubTotalAndVatAndTotal(){
    var firstClassBill = parseFloat(document.getElementById('firstClassBill').innerText);
    var economyClassBill = parseFloat(document.getElementById('economyClassBill').innerText);
    document.getElementById('firstClassBill').innerText=firstClassBill;
    document.getElementById('economyClassBill').innerText=economyClassBill;
    var subTotal = firstClassBill + economyClassBill;
    var vat = (10/100) * subTotal;
    var total = subTotal + vat;
    document.getElementById('subtotalPrice').innerText=subTotal;
    document.getElementById('vatPrice').innerText=vat;
    document.getElementById('totalPrice').innerText=total;
}
function changingSeatCountsAndFare(numberOfSeatsOfTheClass,billOfTheClass,billPerSeatOfClass){
    var numberOfClassSeatsNode = document.getElementById(numberOfSeatsOfTheClass);
    var numberOfClassSeatsString=numberOfClassSeatsNode.value;
    console.log(numberOfClassSeatsString);
    if(numberOfClassSeatsString==""){
        numberOfClassSeatsString=0;
    }
    var numberOfClassSeats=parseInt(numberOfClassSeatsString);
    if(numberOfClassSeats<0){
        showMessage("Amount Of Seats Can't Be Negative!");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }
    else if(isNaN(numberOfClassSeats)){
        showMessage("Invalid Input");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }
    else if(numberOfClassSeats==0){
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }
    else if(numberOfClassSeats*10 != parseFloat(numberOfClassSeatsString)*10){
        showMessage("Inserted A Floating Number Please Insert Desired Integer Number!");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }
    numberOfClassSeatsNode.value=numberOfClassSeats;
    if(doubleFare==1){
        document.getElementById('doubleFareNotification').style.display='block';
        document.getElementById(billOfTheClass).innerText=(2*billPerSeatOfClass*numberOfClassSeats);
    }
    else{
        document.getElementById(billOfTheClass).innerText=(billPerSeatOfClass*numberOfClassSeats);
    }
    updatingSubTotalAndVatAndTotal();
}
document.getElementById('numberOfFirstClassSeats').addEventListener('change',function(){
    changingSeatCountsAndFare('numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat);
})
document.getElementById('numberOfEconomyClassSeats').addEventListener('change',function(){
    changingSeatCountsAndFare('numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat);
})
function changingByButton(plusOrMinus,numberOfSeatsOfTheClass,billOfTheClass,billPerSeatOfClass){
    var valueOfNumberOfFirstClassSeats = document.getElementById(numberOfSeatsOfTheClass).value;
    if(plusOrMinus=='+'){
        if(valueOfNumberOfFirstClassSeats==""){
            document.getElementById(numberOfSeatsOfTheClass).value=1;
        }
        else{
            document.getElementById(numberOfSeatsOfTheClass).value++;
        }
    }
    else if(plusOrMinus=='-'){
        if(valueOfNumberOfFirstClassSeats==""){
            document.getElementById(numberOfSeatsOfTheClass).value=0;
        }
        else{
            if(valueOfNumberOfFirstClassSeats==0){

            }
            else{
                document.getElementById(numberOfSeatsOfTheClass).value--;
            }
        }
    }
    else{
        return;
    }
    changingSeatCountsAndFare(numberOfSeatsOfTheClass,billOfTheClass,billPerSeatOfClass);
}
document.getElementById('plusButtonFirstClass').addEventListener('click',function(){
    changingByButton('+','numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat)
})
document.getElementById('minusButtonFirstClass').addEventListener('click',function(){
    changingByButton('-','numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat)
})
document.getElementById('plusButtonEconomyClass').addEventListener('click',function(){
    changingByButton('+','numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat)
})
document.getElementById('minusButtonEconomyClass').addEventListener('click',function(){
    changingByButton('-','numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat)
})
var fromTextNode = document.getElementById('fromText');
var toTextNode = document.getElementById('toText');
var departureDateNode = document.getElementById('departureDate');
var returnDateNode = document.getElementById('returnDate');
var totalBillNode = document.getElementById('totalPrice');
var todayDate = new Date().toISOString().slice(0, 10);
fromTextNode.addEventListener('change',function(){
    if(fromTextNode.value!=""){
        if(toTextNode.value!=""){
            if(fromTextNode.value==toTextNode.value){
                showMessage('The Departure And Landing Location Can not be Same');
            }
            else if(fromTextNode.value==""){
                showMessage('Please Select The Departure Location First');
            }
        }
    }
    else{
        showMessage('Please Input Departure Location First');
    }
})
toTextNode.addEventListener('change',function(){
    if(toTextNode.value!=""){
        if(fromTextNode.value==""){
            showMessage('Please Select The Departure Location First');
        }
        else{
            if(fromTextNode.value==toTextNode.value){
                showMessage('The Departure And Landing Location Can not be Same');
            }
        }
    }
    else{
        showMessage('Please Select Landing Location');
    }
})
departureDateNode.addEventListener('change',function(){
    if(departureDateNode.value==""){
        showMessage('Please Pick Your Departure Date');
    }
    else{
        if(todayDate>departureDateNode.value){
            showMessage("Departure Date can't be From The Past");
            departureDateNode.value=todayDate;
        }
        else if(departureDateNode.value>returnDateNode.value){
            showMessage("Departure Date can't After Return Date");
            returnDateNode.value=departureDateNode.value;
        }
    }
})
returnDateNode.addEventListener('change',function(){
    if(returnDateNode.value==""){
        doubleFare=0;
        document.getElementById('doubleFareNotification').style.display='none';
        changingSeatCountsAndFare('numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat);
        changingSeatCountsAndFare('numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat);
    }
    else{
        if(departureDateNode.value==""){
            showMessage('Please Pick Your Departure Date First');
        }
        else if(departureDateNode.value>returnDateNode.value){
            showMessage('Return Date Must Be After The Departure Date');
            returnDateNode.value=departureDateNode.value;
        }
        doubleFare=1;
        document.getElementById('doubleFareNotification').style.display='block';
        changingSeatCountsAndFare('numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat);
        changingSeatCountsAndFare('numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat);
    }
})
document.getElementById('bookNowButton').addEventListener('click',function(){
    var fromTextValue = fromTextNode.value;
    var toTextValue = toTextNode.value;
    var departureDateValue = departureDateNode.value;
    var returnDateValue = returnDateNode.value;
    var firstClassSeatsNumber = document.getElementById('numberOfFirstClassSeats').value;
    var economyClassSeatsNumber = document.getElementById('numberOfEconomyClassSeats').value;
    var firstClassBill = parseFloat(document.getElementById('firstClassBill').innerText);
    var economyClassBill = parseFloat(document.getElementById('economyClassBill').innerText);
    var tax = parseFloat(document.getElementById('vatPrice').innerText);
    var totalBill = totalBillNode.innerText;
    var messageToShow = "";
    function billMessage(){
            if(fromTextNode.value!=""){
                messageToShow += 'Departure Location: '+ fromTextNode.value;
            }
            if(toTextNode.value!=""){
                messageToShow += '\nLanding Location: ' + toTextNode.value;
            }
            if(departureDateNode.value!=""){
                messageToShow += '\nDeparture Date: ' + departureDateNode.value;
            }
            if(returnDateNode.value!=""){
                messageToShow += '\nReturn Date: ' + returnDateNode.value;
            }
            if(firstClassSeatsNumber>0){
                messageToShow += '\n\nFirst Class Ticket: ' + firstClassSeatsNumber + '\nFirst Class Fare: ' + firstClassBill;
            }
            if(economyClassSeatsNumber>0){
                messageToShow += '$\n\nEconomy Class Ticket: ' + economyClassSeatsNumber + '\nEconomy Class Fare: ' + economyClassBill;
            }
            if(tax>0){
                messageToShow += '$\n\nTax: ' + tax;
            }
            if(totalBill>0){
                messageToShow += '$\n\nTotal Bill : ' + totalBill  + '$\n\nThank You!';
            }
    }
    var extraMessage = "\n&\nNo Tickets Are Selected!";
    if(fromTextValue==""){
        if(totalBill==0){
            showMessage('Please Input Flying From Location' + extraMessage);
            return;
        }
        showMessage('Please Input Flying From Location');
        return;
    }
    else if(toTextValue==""){
        if(totalBill==0){
            showMessage('Please Input Destination Location' + extraMessage);
            return;
        }
        showMessage('Please Input Destination Location');
        return;
    }
    else if(fromTextValue==toTextValue){
        if(totalBill==0){
            showMessage("Departure and Destination Location can't be same" + extraMessage);
            return;
        }
        showMessage("Departure and Destination Location can't be same");
        return;
    }
    else if(departureDateValue==""){
        if(totalBill==0){
            showMessage('Please Select Departure Date' + extraMessage);
            return;
        }
        showMessage('Please Select Departure Date');
        return;
    }
    else if(todayDate>departureDateValue){
        if(totalBill==0){
            showMessage("Departure Date can't be From The Past" + extraMessage);
            return;
        }
        showMessage("Departure Date can't be From The Past");
        return;
    }
    else if(totalBill==0){
        showMessage('No Tickets Are Selected');
        return;
    }
    else if(returnDateValue!=""){
        if(departureDateValue>returnDateValue){
            showMessage("Return Date Can't Be Before The Departure Date");
        }
        else{
            doubleFare=1;
            document.getElementById('doubleFareNotification').style.display='block';
            changingSeatCountsAndFare('numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat);
            changingSeatCountsAndFare('numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat);
            billMessage();
            showMessage(messageToShow);
            document.getElementById('closePopupBox').addEventListener('click',function(){
                location.reload();
            })
        }
    }
    else{
        doubleFare=0;
        document.getElementById('doubleFareNotification').style.display='none';
        changingSeatCountsAndFare('numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat);
        changingSeatCountsAndFare('numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat);
        billMessage();
        showMessage(messageToShow);
        document.getElementById('closePopupBox').addEventListener('click',function(){
            location.reload();
        })
    }
})

document.getElementById('closePopupBox').addEventListener('click',function(){
    document.getElementById('popupBox').style.display='none';
})

