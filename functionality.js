// if the return ticket is selected then the fare would be doubled and using a label for that
// 1 means return ticket selected & 0 means not
var doubleFare=0;

// A special note is kept hidden 
if(doubleFare==0){
    document.getElementById('doubleFareNotification').style.display='none';
}

// hiding the popup message box function
document.getElementById('closePopupBox').addEventListener('click',function(){
    document.getElementById('popupBox').style.display='none';
})

// making the message popup box hidden
document.getElementById('popupBox').style.display='none';

// this function will set the internal message and also show the popup box that contains the message
function showMessage(message){
    document.getElementById('popupBoxMessage').innerText=message;
    document.getElementById('popupBox').style.display='block';
}

// initializing the fare of the 2 catagories globally
var firstClassFarePerSeat = parseFloat(document.getElementById('firstClassFarePerSeat').innerText);
var economyClassFarePerSeat = parseFloat(document.getElementById('economyClassFarePerSeat').innerText);

// this function will take the individual bills of the 2 classes and then from that it will update the subtotal , vat & the total bill
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

// this is a generalized and parameterized function that changes the seat counts and their individual fare and also does some corner cases
function changingSeatCountsAndFare(numberOfSeatsOfTheClass,billOfTheClass,billPerSeatOfClass){

    // knowing how much seats are selected and if not then initializing with 0 and at last converting to int
    var numberOfClassSeatsNode = document.getElementById(numberOfSeatsOfTheClass);
    var numberOfClassSeatsString=numberOfClassSeatsNode.value;
    if(numberOfClassSeatsString==""){
        numberOfClassSeatsString=0;
    }
    var numberOfClassSeats=parseInt(numberOfClassSeatsString);

    // as the number of seats can not be negative 
    if(numberOfClassSeats<0){
        showMessage("Amount Of Seats Can't Be Negative!");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }

    // if somehow the number of the seats are not a number
    else if(isNaN(numberOfClassSeats)){
        showMessage("Invalid Input");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }

    // if the selected seats are zero in quantity
    else if(numberOfClassSeats==0){
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }

    // if the input seat number is a floating point then giving watrning and taking the integer part or the floor value
    else if(numberOfClassSeats*10 != parseFloat(numberOfClassSeatsString)*10){
        showMessage("Inserted A Floating Number Please Insert Desired Integer Number!");
        numberOfClassSeatsNode.value="";
        document.getElementById(billOfTheClass).innerText=(0);
        updatingSubTotalAndVatAndTotal();
        return;
    }

    // if all okay then setting the seat value 
    numberOfClassSeatsNode.value=numberOfClassSeats;

    // if the return tickets are added then for a single seat the fare would be doubles and a special note will be shown
    if(doubleFare==1){
        document.getElementById('doubleFareNotification').style.display='block';
        document.getElementById(billOfTheClass).innerText=(2*billPerSeatOfClass*numberOfClassSeats);
    }

    // if only the departure ticket is there then the fare will be as normal 
    else{
        document.getElementById(billOfTheClass).innerText=(billPerSeatOfClass*numberOfClassSeats);
    }

    // updating the subtotal , vat & total after each alteration
    updatingSubTotalAndVatAndTotal();
}

// if there is any change in the first class seat number then this will trigger the changingSeatCountsAndFare function
// this is when the alteration is done by inputting numbers not by the + - buttons
document.getElementById('numberOfFirstClassSeats').addEventListener('change',function(){
    changingSeatCountsAndFare('numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat);
})

// if there is any change in the economy class seat number then this will trigger the changingSeatCountsAndFare function
// this is when the alteration is done by inputting numbers not by the + - buttons
document.getElementById('numberOfEconomyClassSeats').addEventListener('change',function(){
    changingSeatCountsAndFare('numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat);
})

// a generalized and parameterized version as the alteration of the seat numbers are done by + - buttons 
function changingByButton(plusOrMinus,numberOfSeatsOfTheClass,billOfTheClass,billPerSeatOfClass){

    // knowing the number if seats
    var valueOfNumberOfClassSeats = document.getElementById(numberOfSeatsOfTheClass).value;

    // adding seats
    if(plusOrMinus=='+'){
        if(valueOfNumberOfClassSeats==""){
            document.getElementById(numberOfSeatsOfTheClass).value=1;
        }
        else{
            document.getElementById(numberOfSeatsOfTheClass).value++;
        }
    }

    // reducing seats
    else if(plusOrMinus=='-'){
        if(valueOfNumberOfClassSeats==""){
            document.getElementById(numberOfSeatsOfTheClass).value=0;
        }
        else{
            if(valueOfNumberOfClassSeats==0){

            }
            else{
                document.getElementById(numberOfSeatsOfTheClass).value--;
            }
        }
    }
    else{
        return;
    }

    // updating the seats and their fares and the bills after each alteration
    changingSeatCountsAndFare(numberOfSeatsOfTheClass,billOfTheClass,billPerSeatOfClass);
}

// adding by + button in the first class
document.getElementById('plusButtonFirstClass').addEventListener('click',function(){
    changingByButton('+','numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat)
})

// reducing by - button in the first class
document.getElementById('minusButtonFirstClass').addEventListener('click',function(){
    changingByButton('-','numberOfFirstClassSeats','firstClassBill',firstClassFarePerSeat)
})

// adding by + button in the economy class
document.getElementById('plusButtonEconomyClass').addEventListener('click',function(){
    changingByButton('+','numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat)
})

// reducing by - button in the economy class
document.getElementById('minusButtonEconomyClass').addEventListener('click',function(){
    changingByButton('-','numberOfEconomyClassSeats','economyClassBill',economyClassFarePerSeat)
})

// globally initializing the variables for the lower work and this mainly contains the dates , locations etc as the nodes not by the values or the innerText
var fromTextNode = document.getElementById('fromText');
var toTextNode = document.getElementById('toText');
var departureDateNode = document.getElementById('departureDate');
var returnDateNode = document.getElementById('returnDate');
var totalBillNode = document.getElementById('totalPrice');
var todayDate = new Date().toISOString().slice(0, 10);

// when the departure location or the location where the journey is from is altered and also doing some corner case checking 
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

// when the landing location or the location where the journey is to is altered and also doing some corner case checking 
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

// alteration in the departure date and corner cases for that
departureDateNode.addEventListener('change',function(){
    if(departureDateNode.value==""){
        showMessage('Please Pick Your Departure Date');
    }
    else{
        if(todayDate>departureDateNode.value){
            showMessage("Departure Date can't be From The Past");
            departureDateNode.value=todayDate;
        }
        else if(returnDateNode.value!="" && departureDateNode.value>returnDateNode.value){
            showMessage("Departure Date can't After Return Date");
            returnDateNode.value=departureDateNode.value;
        }
    }
})

// alteration in the return date and corner cases for that
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

// when book now button is clicked
document.getElementById('bookNowButton').addEventListener('click',function(){

    // locally initializing the variables for mass use as the values or innerTexts
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

    // the message that will be shown in the bill reciet
    var messageToShow = "";

    // generating the message as don't want to show messages that are not used or selected
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

    // extra message that will let the user that the number of seats are 0 which is a big factor in not letting the bill to come
    var extraMessage = "\n&\nNo Tickets Are Selected!";



    // the end result or the billing method is structured around this if else flow
    // showing proper messages so that the user can be walked through the process

    // from location is must
    if(fromTextValue==""){
        if(totalBill==0){
            showMessage('Please Input Flying From Location' + extraMessage);
            return;
        }
        showMessage('Please Input Flying From Location');
        return;
    }

    // to location is also must
    else if(toTextValue==""){
        if(totalBill==0){
            showMessage('Please Input Destination Location' + extraMessage);
            return;
        }
        showMessage('Please Input Destination Location');
        return;
    }

    // from and to locations can't be the same
    else if(fromTextValue==toTextValue){
        if(totalBill==0){
            showMessage("Departure and Destination Location can't be same" + extraMessage);
            return;
        }
        showMessage("Departure and Destination Location can't be same");
        return;
    }

    // departure date is must
    else if(departureDateValue==""){
        if(totalBill==0){
            showMessage('Please Select Departure Date' + extraMessage);
            return;
        }
        showMessage('Please Select Departure Date');
        return;
    }

    // departure date can not be before today
    else if(todayDate>departureDateValue){
        if(totalBill==0){
            showMessage("Departure Date can't be From The Past" + extraMessage);
            return;
        }
        showMessage("Departure Date can't be From The Past");
        return;
    }

    // no bill is there is no seats selected as bill is depended on the seats
    else if(totalBill==0){
        showMessage('No Tickets Are Selected');
        return;
    }

    // when return ticket is also issued and some corner cases
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

    // is the return ticket is not selected and the code reaches safely
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