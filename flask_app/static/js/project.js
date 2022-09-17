
async function display_leo(){
    console.log("wht Me")
    var leoURL = `https://aztro.sameerkumar.website?sign=leo&day=today`;
    console.log(leoURL);
    var currentDate = new Date();
    
    console.log("wht Me")

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
    var location = document.getElementById('birth_location').value;

    var locationURL = `https://api.bloom.be/api/places?name=${location}`


    var settings = {
        method: 'POST',
        headers: {
            "Authorization": "731294|odMjlPGuJH9ZAT4vVYKmVAYgxABNtZWAY9V2UyqJ",
            "Access-Control-Allow-Origin": '*'
        }
    }

    var response = await fetch ( locationURL, settings );
    var places = await response.json();
    console.log(data)


    const results = document.querySelector('#location_results')
    results.innerHTML = 'El Paso';

    if (places['data']){
        for (const place in data){
            results.innerHTML += `
            <option value='${place.id}'>${place.name} ${place.admin1_code}<option>`;
        }
        results.style.display = 'inline-block';
        document.getElementById('birth_location').display = 'none;'
    } else {
        document.getElementById('birth_location').innerHTML = "Invalid spelling format / city name"
    }

}