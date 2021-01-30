var doubleFare=0;
var firstClassFarePerSeat = parseFloat(document.getElementById('firstClassFarePerSeat').innerText);
var economyClassFarePerSeat = parseFloat(document.getElementById('economyClassFarePerSeat').innerText);
function updatingSubTotalAndVatAndTotal(){
    var firstClassBill = parseFloat(document.getElementById('firstClassBill').innerText);
    var economyClassBill = parseFloat(document.getElementById('economyClassBill').innerText);
    console.log(doubleFare);
    if(doubleFare==1){
        document.getElementById('doubleFareNotification').style.display='block';
        firstClassBill*=2;
        economyClassBill*=2;
        document.getElementById('firstClassBill').innerText=firstClassBill;
        document.getElementById('economyClassBill').innerText=economyClassBill;
    }
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
    var numberOfClassSeats=parseInt(numberOfClassSeatsString);
    if(numberOfClassSeats<0){
        alert("Amount Of Seats Can't Be Negative!");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }
    else if(isNaN(numberOfClassSeats)){
        alert("Invalid Input");
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
        alert("Inserted A Floating Number Please Insert Desired Integer Number!");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }
    numberOfClassSeatsNode.value=numberOfClassSeats;
    document.getElementById(billOfTheClass).innerText=(billPerSeatOfClass*numberOfClassSeats);
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

document.getElementById('bookNowButton').addEventListener('click',function(){
    var fromTextValue = document.getElementById('fromText').value;
    var toTextValue = document.getElementById('toText').value;
    var departureDateValue = document.getElementById('departureDate').value;
    var returnDateValue = document.getElementById('returnDate').value;
    var totalBill = document.getElementById('totalPrice').innerText;
    var todayDate = new Date().toISOString().slice(0, 10);
    if(fromTextValue==""){
        alert('Please Input Flying From Location');
        return;
    }
    else if(toTextValue==""){
        alert('Please Input Destination Location');
        return;
    }
    else if(fromTextValue==toTextValue){
        alert("Departure and Destination Location can't be same");
        return;
    }
    else if(departureDateValue==""){
        alert('Please Select Departure Date');
        return;
    }
    else if(todayDate>departureDateValue){
        alert("Departure Date can't be From The Past");
        return;
    }
    else if(returnDateValue!=""){
        if(departureDateValue>returnDateValue){
            alert("Return Date Can't Be Before The Departure Date");
        }
        else{
            doubleFare=1;
            document.getElementById('doubleFareNotification').style.display='block';
        }
    }
    else{
        doubleFare=0;
    }
})