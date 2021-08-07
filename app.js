// Input Variables
const pin = document.getElementById("pin-Code");
const date = document.getElementById("Date");
const costs = document.getElementById("Cost");
const button = document.getElementById("Search");
const reset = document.getElementById("Reset");
const footer = document.getElementById("footer");
const Inputs = document.getElementById("INPUTS");
// Output
const main = document.getElementById("main-Container");

let cascade = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=";
let api = "";
let cost;
reset.addEventListener("click",()=>{
    window.location.reload();
})
function buildData(dataOut){

    main.innerHTML = "";
    // Filter for Free/Paid and both services
    for(data of dataOut){
        if(cost!="All") 
            if(data.fee_type != cost)
                continue;

        // To create datablocks in body
        let eachSlot = document.createElement("div");
        let name = document.createElement("h2");
        let address = document.createElement("h3");
        let vaccine_type = document.createElement("h2");
        let from  = document.createElement("span");
        let to  = document.createElement("span");
        let avail_dose1 = document.createElement("p");
        let avail_dose2 = document.createElement("p");
        let max_age = document.createElement("div");
        let min_age = document.createElement("div");
        let fee = document.createElement("div");
        let price = document.createElement("div");

        // to add data to the body
        name.innerText = data.name;
        vaccine_type.innerText = data.vaccine;
        address.innerText = data.address;
        from.innerText = "Timing: " + data.from;
        to.innerText = " To "+data.to;
        avail_dose1.innerText = "Dose 1: "+data.available_capacity_dose1;
        avail_dose2.innerText = " Dose 2: "+data.available_capacity_dose2;
        if(data.max_age_limit == undefined)
            max_age.innerText = ` Max Age: ${data.min_age_limit} And Above`;
        else
            max_age.innerText = " Max Age: " + data.max_age_limit;
        min_age.innerText = "Min Age: " + data.min_age_limit;
        fee.innerText = "Service: "+data.fee_type;
        price.innerText = "Cost: "+data.fee;

        //Change Color of the availability based on available doses
        if(parseInt(data.available_capacity_dose1)>0)
            avail_dose1.style.backgroundColor = "green";
        else
            avail_dose1.style.backgroundColor = "red";
        if(parseInt(data.available_capacity_dose2)>0)
            avail_dose2.style.backgroundColor = "green";
        else
            avail_dose2.style.backgroundColor = "red";

        // to append the datablocks created to the body
        eachSlot.append(name);
        eachSlot.append(vaccine_type);
        eachSlot.append(address);
        eachSlot.append(from);
        eachSlot.append(to);
        eachSlot.append(avail_dose1);
        eachSlot.append(avail_dose2);
        eachSlot.append(min_age);
        eachSlot.append(max_age)
        eachSlot.append(fee);
        eachSlot.append(price);
        main.append(eachSlot);
        eachSlot.append(document.createElement("hr"));
        eachSlot.classList.add("eachSlot");
    }

}
button.addEventListener("click",()=>{  
    api = `${cascade}${pin.value}&date=${date.value}`;
    cost = costs.value;
    fetch(api)
        .then((data)=> data.json())
        .then((fetched)=>{
            Inputs.remove();
            footer.style.position = "static";
            buildData(fetched.sessions);
        })
        .catch((err)=>{
            console.log("Not Found");
            console.log(err);
        })
})
