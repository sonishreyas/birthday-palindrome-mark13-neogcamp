const dateOfBirth = document.querySelector("#birthday");
const checkButton = document.querySelector("#check-palindrome");
const output = document.querySelector("#output");

const reverseStr = (str) => str.split("").reverse().join("");

const isPalindrome = (str) => str === reverseStr(str);

const convertDatetoString = ({ day, month, year }) => {
  let dateStr = { day: "", month: "", year: "" };
  if (day < 10) {
    dateStr.day = `0${day}`;
  } else {
    dateStr.day += day.toString();
  }

  if (month < 10) {
    dateStr.month = `0${month}`;
  } else {
    dateStr.month += month.toString();
  }

  dateStr.year = year.toString();
  return dateStr;
};

const getAllDateFormats = (date) => {
  const { day, month, year } = convertDatetoString(date);

  const ddmmyyyy = day + month + year;
  const mmddyyyy = month + day + year;
  const yyyymmdd = year + month + day;
  const ddmmyy = day + month + year.slice(-2);
  const mmddyy = month + day + year.slice(-2);
  const yymmdd = year.slice(-2) + month + day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  const listOFPalindromes = getAllDateFormats(date);
  let ans = false;
  for (let i = 0; i < listOFPalindromes.length; i++) {
    if (isPalindrome(listOFPalindromes[i])) {
      ans = true;
      break;
    }
  }
  return ans;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day,
    month,
    year,
  };
};

const getPrevDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      if (month == 1) {
        day = daysInMonth[11];
      } else {
        day = daysInMonth[month - 2];
      }

      month--;
    }
  }
  if (month < 1) {
    month = 12;
    year--;
  }

  return {
    day,
    month,
    year,
  };
};

const getNextPalindromeDate = (date) => {
  let ctr = 0;
  let nextDate = date;
  while (1) {
    ctr++;
    let flagPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (flagPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
};

const getPrevPalindromeDate = (date) => {
  let ctr = 0;
  let prevDate = getPrevDate(date);
  while (1) {
    ctr++;
    let flagPalindrome = checkPalindromeForAllDateFormats(prevDate);
    if (flagPalindrome) {
      break;
    }
    prevDate = getPrevDate(prevDate);
  }
  return [ctr, prevDate];
};

const checkPalindromeFinal = (date) => {
  let flagPalindrome = checkPalindromeForAllDateFormats(date);
  let message;
  if (flagPalindrome) {
    message = "Your birthday is a palindrome.🥳";
  } else {
    let next = getNextPalindromeDate(date);
    let prev = getPrevPalindromeDate(date);
    if (Number(next[0]) <= Number(prev[0])) {
      if (Number(next[0]) === 1) {
        message = `The nearest next palindrome date is ${next[1].day}-${next[1].month}-${next[1].year}, you missed by ${next[0]} day.`;
      } else {
        message = `The nearest next palindrome date is ${next[1].day}-${next[1].month}-${next[1].year}, you missed by ${next[0]} days.`;
      }
    } else {
      if (Number(prev[0]) === 1) {
        message = `The nearest palindrome date is ${prev[1].day}-${prev[1].month}-${prev[1].year}, you missed by ${prev[0]} day.`;
      } else {
        message = `The nearest palindrome date is ${prev[1].day}-${prev[1].month}-${prev[1].year}, you missed by ${prev[0]} days.`;
      }
    }
  }
  output.innerText = message;
};

const clickHandler = (e) => {
  const dateList = dateOfBirth.value.toString().split("-");
  const date = {
    day: Number(dateList[2]),
    month: Number(dateList[1]),
    year: Number(dateList[0]),
  };
  checkPalindromeFinal(date);
};
checkButton.addEventListener("click", clickHandler);
