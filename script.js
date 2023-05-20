const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-month"),
  prevNextIcon = document.querySelectorAll(".cal-button");

const sunday = document.getElementById("sunday"),
  monday = document.getElementById("monday"),
  tuesday = document.getElementById("tuesday"),
  wednesday = document.getElementById("wednesday"),
  thursday = document.getElementById("thursday"),
  friday = document.getElementById("friday"),
  saturday = document.getElementById("saturday");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let liDayTag = "";
  const currentDay = new Date().getDay();

  switch (currentDay) {
    case 0:
      sunday.classList.add("active");
      break;
    case 1:
      monday.classList.add("active");
      break;
    case 2:
      tuesday.classList.add("active");
      break;
    case 3:
      wednesday.classList.add("active");
      break;
    case 4:
      thursday.classList.add("active");
      break;
    case 5:
      friday.classList.add("active");
      break;
    case 6:
      saturday.classList.add("active");
      break;
    default:
      break;
  }

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liDayTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liDayTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liDayTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liDayTag;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

const hourNow = document.getElementById("now");
const weekDay = document.getElementById("week-day");
const today = document.getElementById("today");

const clock = setInterval(function time() {
  let dateToday = new Date(),
    hour = dateToday.getHours(),
    min = dateToday.getMinutes();

  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;

  weekDay.textContent = dateToday.toLocaleDateString("en", { weekday: "long" });

  today.textContent = `${dateToday.getDay()} ${months[currMonth]}, ${currYear}`;

  hourNow.textContent = `${hour}:${min}`;
});