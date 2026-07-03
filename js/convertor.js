import {country_list,currencyNames} from './list.js';


let dropdowns = document.querySelectorAll(".select-container select");

let fval=document.querySelector(".from select");
let tval=document.querySelector(".to select");

let btn = document.querySelector("form button");


//dropdown name of currencies
for (let select of dropdowns){
    for(let currcode in currencyNames){
        let op = document.createElement("option");

        op.setAttribute("value",currcode)       
        op.innerText=currencyNames[currcode];

        if(select.name =="from" && currcode=="INR"){
            op.selected = "selected";
        }
        else if (select.name =="to" && currcode=="USD"){
            op.selected = "selected";
        }
        select.appendChild(op);

    }
    select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        }); 
           
}

const updateflag = (element)=>{
    let currcode = element.value;
    let councode = country_list[currcode];
    let newsrc = `https://flagsapi.com/${councode}/flat/64.png`;
    
    let imgtag = element.parentElement.querySelector("img");
    imgtag.src= newsrc;
}




let f_input = document.querySelector(".from input");
let t_input = document.querySelector(".to input");

let msg = document.querySelector("form .msg");
const syncvalue = async(direction)=>{
    
    let f_rate =await chngerate(fval.value);
    let s_rate =await chngerate(tval.value);
    

    let exchange_rate = s_rate/f_rate;
    // console.log(exchange_rate);

    
    if(direction === "from"){
        let amount = parseFloat(f_input.value);
        if(amount!= 0 || amount<0){
            t_input.value = (amount * exchange_rate).toFixed(3); 
        }
        else{
            t_input.value= "";
        }
    }
    else if (direction === "to"){
        let amount = parseFloat(t_input.value);
        if(amount!= 0 || amount<0){
            f_input.value = (amount / exchange_rate).toFixed(3); 
        }
        else{
            f_input.value= "";
        }
    }
    hidemsg(f_input,t_input);    
    
    msg.innerText = `${f_input.value || 0} ${fval.value} = ${t_input.value || 0} ${tval.value} `;

}

const hidemsg = (a,b)=>{
    if(a.value=="" || b.value == ""){
        msg.style.opacity="0";
    }else{
        msg.style.opacity="1";
    }
}

let chnge = document.querySelector("#chnge");
//Exchanging the values when clicked
chnge.addEventListener("click",()=>{
    let extra_in = f_input.value;
    f_input.value = t_input.value;
    t_input.value = extra_in;
    
    
    let extra = fval.value;
    fval.value=tval.value;
    tval.value=extra;
    
    for(let select of dropdowns){
        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        }); 
    }
    
    updateflag(fval);
    updateflag(tval);
    
    if(f_input.value==""){
    
    }
    else{
        syncvalue(1);
    }
});

f_input.addEventListener("input",()=> syncvalue("from"));
t_input.addEventListener("input",()=> syncvalue("to"));

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
});

const setval = (f,t)=>{
    f_input.value=f;
    t_input.value=t;
}

const getrate = async()=>{
    let URL = `https://open.er-api.com/v6/latest/${fval.value}`;
    let res = await fetch(URL);
    let data = await res.json();
    // console.log(data);
    return data.rates;
}

const chngerate = async (sval)=>{
    let exrate = await getrate();
    return exrate[sval];
}

//function for inr rates comparisons
(async ()=>{
    let URL = "https://open.er-api.com/v6/latest/INR";
    
    let response = await fetch(URL);
    let result = await response.json();
    
    let result_list = result.rates;

    for(let counname in result_list){
        let country = currencyNames[counname];
        let value = result_list[counname];
        
        card_maker(country,value);
    }

})();

const card_maker = (name,value)=>{
    let card = document.createElement("div");
    card.classList.add("card");
    
    let c_name = document.createElement("p");
    c_name.classList.add("country-name");
    card.appendChild(c_name);
    c_name.innerText = name;

    let group = document.createElement("div");
    group.classList.add("rate-group");

    let r_value = document.createElement("p");
    r_value.classList.add("rate-show");
    r_value.innerText = value;
    group.appendChild(r_value);
    
    let icon = document.createElement("i");
    icon.classList.add("fa-solid"); 
    group.appendChild(icon);
    
    card.appendChild(group);
    value.toFixed(4);


    if(value<1){
        icon.classList.add("fa-angles-down");
    }else if(value>1){
        icon.classList.add("fa-angles-up");
    }
    else{
        icon.classList.add("fa-seedling");
    }

    let area = document.querySelector(".aside marquee");
    area.appendChild(card);
    // console.log(card);
}





