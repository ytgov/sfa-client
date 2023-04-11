const validator = {
    email: function (email) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return regex.test(email);
    },

    telephone: function (telephone) {
        const regex = /^\(?\d{3}\)?[-]\d{3}[-]\d{4}$/g;
        return regex.test(telephone);
    },
    year: function (year) {
        const regex = /^\d{4}$/g;
        return regex.test(year) && Number(year) > 1949;
    },
    year: function (year) {
        const regex = /^\d{4}$/g;
        return regex.test(year) && Number(year) > 1949;
    },
    isLess: function (a, b) {
        return Number(a) <= Number(b);
    },
    month: function (month) {
        return Number(month) >= 1 && Number(month) <= 12;
    },
    isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();;
        } else {
            return true;
        }
    },
    isLetter(evt) {
        const regex = /^[a-zA-Z]+$/;
        if ((!regex.test(evt.key))) {
            evt.preventDefault();
        } else {
            return true;
        }
    },
    SIN(sin) {
        var check, even, tot;
        console.log(sin);
        if (typeof sin === 'number') {
            sin = sin.toString();
        }

        if (sin.length === 9) {
            // convert to an array & pop off the check digit
            sin = sin.split('');
            check = +sin.pop();

            even = sin
                // take the digits at the even indices
                .filter(function (_, i) { return i % 2; })
                // multiply them by two
                .map(function (n) { return n * 2; })
                // and split them into individual digits
                .join('').split('');

            tot = sin
                // take the digits at the odd indices
                .filter(function (_, i) { return !(i % 2); })
                // concatenate them with the transformed numbers above
                .concat(even)
                // it's currently an array of strings; we want numbers
                .map(function (n) { return +n; })
                // and take the sum
                .reduce(function (acc, cur) { return acc + cur; });

            // compare the result against the check digit
            console.log("inside", check === (10 - (tot % 10)) % 10);
            return check === (10 - (tot % 10)) % 10;
        } else return false;
    }
}

export default validator;