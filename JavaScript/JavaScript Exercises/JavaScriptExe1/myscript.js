window.onload = function(event){
    
    console.log(event);
    
    var facts = {
        
        fact:[],
        details:[]
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
};

function removeElement(event)
{
    console.log(event.target.parentNode);
    fact_body.removeChild(event.target.parentNode);
}