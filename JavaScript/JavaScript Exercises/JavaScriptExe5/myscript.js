
function handleResponse(event)
{
    console.log(event);
}

window.onload = function(event){
    
    console.log(event);
    
    var xhr = new XMLHttpRequest();
    
    //Check if CORS is supported by browser
    if('withCredentials' in xhr)
    {
        xhr.onreadystatechange = handleResponse;
        xhr.open('GET','http://api.openweathermap.org/data/2.5/weather?q=Oulu,fi',true);
        xhr.send();
    }
    var facts = {
        
        fact:[],
        details:[]
    }
    
    var stringObject = localStorage.getItem('facts_in_storage');
    
    if(stringObject)
    {
    
        var realObject = JSON.parse(stringObject);
        for(var i = 0; i < realObject.fact.length; i++)
        {
            var tr = document.createElement('tr');
            tr.onclick = removeElement;
            var td_fact =  document.createElement('td');
            var td_details = document.createElement('td');

            td_fact.innerHTML = realObject.fact[i];
            td_details.innerHTML = realObject.details[i];
            
            facts.fact.push(realObject.fact[i]);
            facts.details.push(realObject.details[i]);

            tr.appendChild(td_fact);
            tr.appendChild(td_details);
            fact_body.appendChild(tr)
        }
    }
    
    bad_eye.onclick = function(event){
        var para_array = document.getElementsByTagName('p');
        
        var fontSize = "16px";
        
        var test_value = para_array[0];
        
        if(test_value.style.fontSize === '16px')
        {
            fontSize = '20px';
        }
        
        for(var i = 0; i < para_array.length; i++)
        {
            var temp = para_array[i];
            temp.style.fontSize =fontSize;
        }
    }
    
    save_fact.onclick = function(event){
       
        facts.fact.push(fact_text.value);
        facts.details.push(details_text.value);
        
        localStorage.setItem('facts_in_storage', JSON.stringify(facts));
        
        var tr = document.createElement('tr');
        tr.onclick = removeElement;
        var td_fact =  document.createElement('td');
        var td_details = document.createElement('td');
        
        td_fact.innerHTML = fact_text.value;
        td_details.innerHTML = details_text.value;
        
        tr.appendChild(td_fact);
        tr.appendChild(td_details);
        fact_body.appendChild(tr);
    }
    
    var tr_array = document.getElementsByTagName('tr');
    for(var i = 0; i < tr_array.length; i++)
    {
        tr_array[i].onclick = removeElement;
    }
    
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success,fail);
    }
};

function removeElement(event)
{
    console.log(event.target.parentNode);
    fact_body.removeChild(event.target.parentNode);
}

function success(geolocation){
    
    var myLocation = new google.maps.LatLng(geolocation.coords.latitude, geolocation.coords.longitude);
    
    var settings = {
        zoom:14,
        center:myLocation,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    }
    
    var mymap = new google.maps.Map(here_map,settings);
    var marker = new google.maps.Marker({position:myLocation,map:mymap});
    
}

function fail()
{
    console.log('no luck!');
}