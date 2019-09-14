const startButton = document.getElementsByName('btn')[0];
const stopButton = document.getElementsByName('btn')[1];
const resetButton = document.getElementsByName('btn')[2];
let getTime = document.getElementById('get-time');
let countdown = '';

//set properties for the visual display of timer
const setVisibleCounter=(y, x)=>
{
    switch(y)
    {
        case 'innerHTML': 
            return document.getElementById('timer').innerHTML = x;
        case 'color':
            return document.getElementById('timer').style.color = x;
    }
};//----//
setVisibleCounter('innerHTML', "00:00:00");

//toggle the start and stop buttons
const showStart =(show)=>
{
    if(show)
    {
        startButton.style.display = "inline-block";
        stopButton.style.display = "none";
        document.getElementsByClassName('opt')[1].classList.remove('active');
    }
    else
    {
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";
        document.getElementsByClassName('opt')[1].classList.add('active');
    }
};

//---START TIMER EVENT---//
let clicked = startButton.addEventListener('click', function()
{
    let time = document.getElementById('get-time').value;
    showStart(false);
    time = time.toString();

    //fix for the 'seconds' value sometimes not getting added 
    //to the string if it's at '00'
    if(time.length === 5)
    {
        time = time.concat(":"+"0"+"0");
    }//---//

    let getHours = parseInt(time[0]+time[1], 10);
    let getMinutes = parseInt(time[3]+time[4], 10);
    let getSeconds = parseInt(time[6]+time[7], 10);

    let hours = 0;
    let minutes = 0;
    let seconds = 0;
        
    //start counting
    countdown = setInterval(function()
    {
        seconds = getSeconds;
        minutes = getMinutes;
        hours = getHours;

        //add a second '0' if needed cause ints dont show '00'
        if(getHours<10)
            {
                hours = '0'+getHours;
            }
        if(getMinutes<10)
            {
                minutes = '0'+getMinutes;
            }
        if(getSeconds<10)
            {
                    seconds = '0'+getSeconds;
            }
        //-----------------//

        //update the inner html(timer)
        setVisibleCounter('innerHTML', hours+":"+minutes+":"+seconds);
        document.getElementById('get-time').value = hours+":"+minutes+":"+seconds;
        getSeconds--;//---//

        if(getHours>0)
        {
            if(getMinutes<0)
            {
                getHours--;
                getMinutes = 59;
            }
        }
        if(getSeconds<0 && getMinutes>0)
        {
            getMinutes--;
            getSeconds = 59;
        }
        else if(getSeconds<0 && getHours>0)
           {
            getHours--;
            getMinutes = 59;
            getSeconds = 59;
        }

        //style adjustment
        if(hours === '00' && minutes ==='00' && getSeconds<=59)
            setVisibleCounter('color', 'rgba(209, 9, 9, 0.795)');
        else 
            setVisibleCounter('color', 'black');
        
        //if the countdown ends, return to the default looks and stop the countdown
        if(document.getElementById('timer').innerHTML === '00:00:00')
        {
            showStart(true);
            setVisibleCounter('color', 'black');
            clearInterval(countdown);
        }
    },1000);
});//---END OF START TIMER---//

//---START OF STOP TIMER EVENT---//
let stopped = stopButton.addEventListener("click", function()
{
    showStart(true);
    clearInterval(countdown);

});//---END OF STOP TIMER EVENT---//

//---START THE RESET EVENT---//
let reset = resetButton.addEventListener("click", function()
{
    //give elements proper values
    getTime.value = "00:00:00";
    setVisibleCounter('innerHTML', '00:00:00');
    setVisibleCounter('color', 'black');
    
    showStart(true);
    clearInterval(countdown);
});//---END OF RESET TIMER EVENT---//
