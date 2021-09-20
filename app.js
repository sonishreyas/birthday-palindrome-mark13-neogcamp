function reverseStr(str)    {
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse
}

function convertDatetoString(date)  {
    var dateStr = { day: '', month: '', year: '' };
    if(date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day += date.day.toString();
    }

    if(date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month += date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date)    {
    var dateStr = convertDatetoString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day; 

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeForAllDateFormats(date) {
    var listOFPalindromes = getAllDateFormats(date);
    var ans = false;
    for(var i=0; i< listOFPalindromes.length; i++)  {
        if(isPalindrome(listOFPalindromes[i]) )  {
            ans = true;
            break;
        }
    }
    return ans;
}

function isLeapYear(year)   {
    if( year % 400 === 0 )  {
        return true;
    }
    if( year % 100 === 0 ) {
        return false;
    }
    if( year % 4 === 0 )    {
        return true;
    }
    return false;
}

function getNextDate(date)  {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month == 2){
        if(isLeapYear(year))    {
            if(day > 29)    {
                day = 1;
                month++;
            }
        }
        else    {
            if(day > 28)    {
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1])    {
            day = 1;
            month++;
        }
    }
    if(month > 12)  {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };

}

function getPrevDate(date)  {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month == 3){
        if(isLeapYear(year))    {
            if(day < 1)    {
                day = 29;
                month--;
            }
        }
        else    {
            if(day < 1)    {
                day = 28;
                month--;
            }
        }
    }
    else{
        if(day < 1 )    {
            day = daysInMonth[month - 2];
            month--;
        }
    }
    if(month < 1)  {
        month = 12;
        year--;
    }
    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date)    {
    var ctr = 0;
    var nextDate = getNextDate(date);
    while(1)    {
        ctr++;
        var flagPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (flagPalindrome)   {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPrevPalindromeDate(date)    {
    var ctr = 0;
    var prevDate = getPrevDate(date);
    while(1)    {
        ctr++;
        var flagPalindrome = checkPalindromeForAllDateFormats(prevDate);
        if (flagPalindrome)   {
            break;
        }
        prevDate = getPrevDate(prevDate);
    }
    return [ctr, prevDate];
}

function checkPalindromeFinal(date) {
    var flagPalindrome = checkPalindromeForAllDateFormats(date);
    if (flagPalindrome) {
        console.log("Your birthday is a palindrome.🥳");
    }   else{
        var next = getNextPalindromeDate(date);
        var prev = getPrevPalindromeDate(date);
        if (next[0] <= prev[0]) {
            console.log(next);
        } else  {
            console.log(prev);
        }
    }
}

var date = {
    day:1,
    month: 03,
    year: 2020
}

console.log(checkPalindromeFinal(date));
