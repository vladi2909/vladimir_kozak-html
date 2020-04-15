let body = document.querySelector('body');
body.style.cssText = `
                      height: 100vh;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      background: #444`;
       
function createCalendar(year, month) {

  let container = document.createElement('table');
  container.style.cssText = ` background: #fff;
                              width: 250px;
                              height: 250px;
                              cursor: pointer;
                              text-align: center;`;

  body.appendChild(container);

  let d = new Date(year, month);
  var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    
  for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    while (d.getMonth() == month) {
      table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { 
            table += '</tr><tr>';
          }
    
          d.setDate(d.getDate() + 1);
        }  

        if (getDay(d) != 0) {
            for (var i = getDay(d); i < 7; i++) {
              table += '<td></td>';
            }
          }
          
      table += '</tr></table>';
      container.innerHTML = table;
         
}

function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  }
  
  let d = new Date();
  let day = d.getFullYear();
  let month = d.getMonth();
  let now = d.getDate();

 createCalendar(day, month);