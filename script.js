let date;
let selection;

function mod(n, m) {
    return ((n % m) + m) % m;
}

function generateDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function nthNumber(number) {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
}

function formatDate(date) {
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: "long" });
    let year = date.getFullYear();
    return `${month} ${day}${nthNumber(day)}, ${year}`
}

function setDate() {
    date = generateDate(new Date(1900, 0, 1), new Date(2100, 0, 1));
    document.getElementsByClassName("date")[0].innerText = formatDate(date);
}

function addEventListeners() {
    Array.from(document.getElementsByClassName("button-group")[0].children).forEach((child) => {
        child.addEventListener("click", (e) => {
            Array.from(e.target.parentElement.children).forEach((c) => {
                c.style = '';
            })
            selection = e.target.getAttribute("data-day");
            e.target.style = 'background: #94618e; color: white;'
        })
    })
}

function getWeekDay(date) {
    let d = date.getDate();
    let m = mod((date.getMonth() - 2), 12) + 1;
    let year = date.getFullYear();
    let C = parseInt(year.toString().substring(0, 2));
    let Y = parseInt(year.toString().substring(2, 4));
    if (m == 11 || m == 12) {
        Y = Y - 1;
    }
    result = mod((d + Math.floor(2.6 * m - 0.2) - (2 * C) + Y + Math.floor(Y/4) + Math.floor(C/4)), 7);
    result_table = {
        0: "sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday"
    }
    return result_table[result]
}

function submit() {
    if (selection == getWeekDay(date)) {
        console.log("correct")
        setDate();
    }
    else {
        console.log("incorrect")
    }
}

window.onload = () => {
    setDate();
    addEventListeners();
};

const modal = document.getElementById("modal");
const modalBtn = document.getElementById("open-modal");
const modalClose = document.getElementsByClassName("close")[0];

modalBtn.onclick = function() {
  modal.style.display = "block";
}

modalClose.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}