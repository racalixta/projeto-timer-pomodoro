const workMinutes = document.getElementById("work-minutes");
const pauseMinutes = document.getElementById("pause-minutes");
const sectionTimes = document.getElementById("section-times");
const appContainer = document.querySelector(".app-container");
const timerContainer = document.querySelector(".timer-container");
const timerTitle = document.getElementById("timer-title");
const timerMinutes = document.querySelector(".timer-minutes");

const bell = new Audio("./audio/bell.mp3");
const volta = new Audio("./audio/volta.mp3");

function tileValue(arrow) {
    const checkArrow = document.getElementById(arrow);

    if(checkArrow.classList.contains('up-arrow')) {
        if(checkArrow.id === "work-up") {
            return workMinutes.textContent = Number(workMinutes.textContent) + 1;
        }

        if(checkArrow.id === "pause-up") {
            return pauseMinutes.textContent = Number(pauseMinutes.textContent) + 1;
        }

        if(checkArrow.id === "section-up") {
            return sectionTimes.textContent = Number(sectionTimes.textContent) + 1;
        }
        
    }

    if(checkArrow.classList.contains('down-arrow')) {
        if(checkArrow.id === "work-down") {
            if(Number(workMinutes.textContent) === 1) {
                return workMinutes.textContent = Number(workMinutes.textContent);
            }

            return workMinutes.textContent = Number(workMinutes.textContent) - 1;
        }

        if(checkArrow.id === "pause-down") {
            if(Number(pauseMinutes.textContent) === 1) {
                return pauseMinutes.textContent = Number(pauseMinutes.textContent);
            }

            return pauseMinutes.textContent = Number(pauseMinutes.textContent) - 1;
        }

        if(checkArrow.id === "section-down") {
            if(Number(sectionTimes.textContent) === 1){
                return sectionTimes.textContent = 1; 
            }
            return sectionTimes.textContent = Number(sectionTimes.textContent) - 1;
        }
        
    }
    
}

function createMinutes() {

    appContainer.classList.add("hidden");
    timerContainer.classList.remove("hidden");
    

    function createSeconds(sec) {
        const data = new Date(sec * 1000);
        return data.toLocaleTimeString("pt-BR", {
            hour12: false,
            timeZone: "UTC"
        });
    }

    let timer;
    let workSeconds = Number(workMinutes.textContent) * 60;
    let pauseSeconds = Number(pauseMinutes.textContent) * 60;
    let timesCounter = Number(sectionTimes.textContent) * 2;
    let seconds = workSeconds;
    let ciclo = 0;
    let isPaused = false;
    let totalSecs;

    minutesHolder();
    function minutesHolder() {
        let placeHolder = createSeconds(seconds);

        if(placeHolder.slice(0,2) === "00"){
            timerMinutes.innerHTML = placeHolder.slice(3, 8);

        } else {
            timerMinutes.innerHTML = placeHolder;
        }    

    }

    function downTempo() {

        timer = setInterval(function () {
            
            minutesHolder();

            if(isPaused === false){

                seconds--;
                totalSecs = createSeconds(seconds);

                if(totalSecs === "00:00:00" || totalSecs === "23:59:59"){
                    check()
                }
   
                if(totalSecs.slice(0,2) === "00"){
                    timerMinutes.textContent = totalSecs.slice(3, 8);
                } else {
                    timerMinutes.textContent = totalSecs;
                }

            }
            
        }, 1000);

        function check(){
            let resto = ciclo % 2;
            ciclo++;
            timesCounter--;

            if(resto === 0) {
                bell.play();
                seconds = pauseSeconds; // pause  
                timerTitle.textContent = "Descanso";
            }
    
            if(resto !== 0) {
                volta.play();
                seconds = workSeconds; // work
                timerTitle.textContent = "Trabalho";
            }

            if(timesCounter === 0){
                window.alert("Seu ciclo Pomodoro terminou!!")
                appContainer.classList.remove("hidden");
                timerContainer.classList.add("hidden");
            }

            isPaused = true;

        }

    }

    document.addEventListener("click", e => {
        const element = e.target;

        if(element.classList.contains("reset")) {
            location.reload();
        }

        if(element.classList.contains('start')){
            timerMinutes.classList.remove('pausado');
            isPaused = false;
            clearInterval(timer);
            downTempo();
            
        }

        if(element.classList.contains('pause')){
            if(seconds !== 0){
                timerMinutes.classList.add('pausado')
            }
            
            isPaused = true;
            clearInterval(timer);

        }

    });

}
