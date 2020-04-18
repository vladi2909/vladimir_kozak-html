//Date
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

// container
let body = document.querySelector('body');
let containerCalendar = document.createElement('div');
containerCalendar.setAttribute("id", "containerCalendar");                  
body.appendChild(containerCalendar);

//container-buttons
let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('id', "buttonContainer")
containerCalendar.appendChild(buttonContainer);

// buttons
let monthAndYear = document.createElement('div');
let previous = document.createElement('button');
buttonContainer.appendChild(previous);
buttonContainer.appendChild(monthAndYear);
let next = document.createElement('button');
buttonContainer.appendChild(next);
previous.innerHTML = "&#8249;";
next.innerHTML = "&#8250;";
previous.addEventListener( "click" , fPrevious );
next.addEventListener( "click", fNext );

// calendar-table
let table = document.createElement('table');
containerCalendar.appendChild(table);

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let thead = document.createElement('thead');
table.appendChild(thead);

let $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th>" + days[dhead] + "</th>";
}

$dataHead += "</tr>";
thead.innerHTML = $dataHead;

let tbody = document.createElement("tbody");
table.appendChild(tbody);

showCalendar(currentMonth, currentYear);

function fPrevious() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function fNext() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = ( new Date( year, month) ).getDay() - 1;
    if (firstDay < 0) {
        firstDay = 6;
    }

    let tbody = document.getElementsByTagName("tbody");
    tbody[0].innerHTML = "";

    monthAndYear.innerHTML = months[month] + " " + year;

    let date = 1;
    let dayСounterEnd = 1;
    let dayCounterStart = getLastDayOfMonth(year, month);

    for ( let i = 0; i < 6; i++) {

        let row = document.createElement("tr");

        for (let j = 0; j < 7; j ++) {

            if (i === 0 && j < firstDay) {

                let cell = document.createElement("td");
                dayCounterStart++;
                cell.innerHTML = dayCounterStart - firstDay;
                cell.setAttribute('class', 'hidden');
                row.appendChild(cell);
            }

            else if ( date > daysInMonth(month, year) ) {
        
                let cell = document.createElement("td");
                cell.innerHTML = dayСounterEnd;
                dayСounterEnd ++;
                cell.setAttribute('class', 'hidden');
                row.appendChild(cell);
            }

            else {

                let cell = document.createElement("td");
                cell.innerHTML = "<span>" + date + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "today";
                }

                row.appendChild(cell);
                date++;
            }
        }

        tbody[0].appendChild(row);
    }
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function getLastDayOfMonth(year, month) {
    let date = new Date(year, month, 0);
    return date.getDate();
}