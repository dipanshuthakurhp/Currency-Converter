const url = "https://api.frankfurter.app/latest?amount=" //100&from=USD&to=INR
let output = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
for(let drp of dropdowns){
    for(let code in countryList){
        console.log(code, countryList[code]);
        newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if(code =="USD" && drp.name=="from"){
            newoption.selected = "selected";
        }
        if(code =="INR" && drp.name=="to"){
            newoption.selected = "selected";
        }
        drp.append(newoption);
    }
    drp.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let code = element.value;
    let ccode = countryList[code];
    let furl = `https://flagsapi.com/${ccode}/flat/64.png`;
    let fsrc = element.parentElement.querySelector("img");
    fsrc.src = furl;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault(); //to prevent all default actions
    let amount = document.querySelector("form input");
    let amt = amount.value;
    if (amt=="" || amt<1){
        amount.value =1;
        amt = 1;
    }

    let purl = `${url}${amt}&from=${fromcurr.value}&to=${tocurr.value}`;
    try{

        let response = await fetch(purl);
        //console.log(response);
        let data =  await response.json();
        let out = data.rates[tocurr.value];
        output.classList.remove("Error_popup");
        output.innerText = `${amt}${fromcurr.value} = ${out}${tocurr.value}`;
    }
    catch(err){
        output.innerHTML = "Data Not Available";
        if(tocurr.value==fromcurr.value)
            output.innerHTML = "Select different currencies";
        output.classList.add("Error_popup");
    }    
})

