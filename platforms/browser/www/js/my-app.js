// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    currencyRate();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
 
var rateR=0;
var CurrentChange="";
function currencyRate()
{
 
    var http= new XMLHttpRequest();
    const url='http://apilayer.net/api/live?access_key=6d3651564f4794e0aeb46979636b86ac';
    http.open("GET", url);
    http.send();
    http.onreadystatechange=(e)=>{
        var response =http.responseText;
        var responseJSON=JSON.parse(response);
        console.log(responseJSON);
        //rates
        CurrentChange= "Euro 1  =  USD "+ responseJSON.quotes.USDEUR;
        rateR=responseJSON.quotes.USDEUR;
        
        document.getElementById("rateCurrent").innerHTML=CurrentChange;
        document.getElementById("txtResult").value= rateR ;
    }
}

 
//state
var stateChange="USD";
//State to convert currency
var stateCurrent="USD";
function changeCurrency()
{
    if(stateChange=="USD"){
        
        stateChange="EURO";
        CurrentChange= "USD "+ rateR +" = Euro 1";
        stateCurrent="USD";
        document.getElementById("lblAmount").innerHTML="USD";
        document.getElementById("lblResult").innerHTML="EURO";
        document.getElementById("txtResult").value=0;
        document.getElementById("txtAmount").value=0;
    }
    else{
        document.getElementById("txtResult").value=0;
        document.getElementById("txtAmount").value=0;
        CurrentChange= "Euro 1  =  USD "+ rateR;
        stateChange="USD";
        stateCurrent="EURO";
        document.getElementById("lblAmount").innerHTML="EURO";
        document.getElementById("lblResult").innerHTML="USD";
        
    }
    document.getElementById("rateCurrent").innerHTML=CurrentChange;
    
}
function convertCurrency()
{
    var result;
    var amount=document.getElementById("txtAmount").value;
    if(stateCurrent=="USD"){
        result=amount * rateR;
    }else
    {
        result=amount / rateR;
    }
    document.getElementById("txtResult").value=result;
}



