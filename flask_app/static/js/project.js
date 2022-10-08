
async function display_leo(){

    var leoURL = `https://aztro.sameerkumar.website?sign=leo&day=today`;
    var currentDate = new Date();

    document.getElementById('current_date').innerHTML = currentDate.toLocaleDateString('en-US');

    var settings = {
    method : "POST"
    };

    var response = await fetch ( leoURL, settings );
    var data = await response.json();

    console.log(data)
    
    document.getElementById('compatability').innerHTML= data['compatibility'];

    document.getElementById('mood').innerHTML= data['mood'];
    
    document.getElementById('lucky_color').innerHTML= `Lucky color is: ${data['color']}`;

    document.getElementById('lucky_time').innerHTML= `Lucky time of day is: ${data['lucky_time']}`;

    document.getElementById('lucky_number').innerHTML= `Today's Lucky number is: ${data['lucky_number']}`;

    document.getElementById('description').innerHTML= data['description'];
}

async function display_sign(){

    const sign = document.getElementById('signX').value;
    const day = document.getElementById('day').value;

    var signURL = `https://aztro.sameerkumar.website?sign=${sign}&day=${day}`;
    var settings = {
        method : "POST"
        };
    
    var response = await fetch ( signURL, settings );
    var data = await response.json();

    document.getElementById('sign').innerHTML= `${sign}`;

    document.getElementById('signImg').src=`/static/images/signs/${sign}.png`

    console.log(document.getElementById('signImg').src)

    document.getElementById('current_date').innerHTML= `${day}: ${data['current_date']}`;
    
    document.getElementById('compatability').innerHTML= data['compatibility'];
    
    document.getElementById('mood').innerHTML= data['mood'];
        
    document.getElementById('lucky_color').innerHTML= `Lucky color is: ${data['color']}`;
    
    document.getElementById('lucky_time').innerHTML= `Lucky time of day is: ${data['lucky_time']}`;
    
    document.getElementById('lucky_number').innerHTML= `Today's Lucky number is: ${data['lucky_number']}`;
    
    document.getElementById('description').innerHTML= data['description'];
}


async function left_description(){

    document.getElementById('description').innerHTML = "Cycle left through horoscopes"
}

async function right_description(){

    document.getElementById('description').innerHTML = "Cycle right through horoscopes"
}


async function get_location(){
    const location = document.getElementById('birth_location').value;
    console.log(location);

    const URL = `https://spott.p.rapidapi.com/places/autocomplete?limit=10&skip=0&country=US%2CCA%2CMX&q=${location}&type=CITY`;


    const settings = {
        method: 'GET',
        headers: {
    'X-RapidAPI-Key': 'f815fbac89msh4d641516a677c7fp1cd9a8jsnd3017f41442f',
    'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    }
};

    const response = await fetch ( URL, settings );
    const places = await response.json();
    console.log(places)

    const results = document.querySelector('#location_results')
    console.log(results.name);
    results.style.display = 'inline-block';
    document.getElementById('birth_location').style.display = 'none';
    document.getElementById('button-addon2').style.display = 'none';


    if (places.length > 0){
        for (let i = 0; i < places.length; i++){
            results.innerHTML += `<option value='${places[i].coordinates.latitude} ${places[i].coordinates.longitude}'>${places[i].name}, ${places[i].adminDivision1.name} ${places[i].country.id}<option>`;
        }
    } else {
        document.getElementById('birth_location').value = "Invalid Input, no location found"
    }
}