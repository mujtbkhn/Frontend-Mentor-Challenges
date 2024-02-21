document.addEventListener('DOMContentLoaded', () => {

    const day = document.getElementById('day')
    const dayError = document.getElementById('dayError')
    const month = document.getElementById('month')
    const monthError = document.getElementById('monthError')
    const year = document.getElementById('year')
    const yearError = document.getElementById('yearError')
    const form = document.getElementById('ageForm')
    const years = document.querySelector('.years')
    const months = document.querySelector('.months')
    const days = document.querySelector('.days')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        dayError.textContent = '';
        monthError.textContent = '';
        yearError.textContent = '';

        const dayValue = parseInt(day.value.trim(), 10)
        const monthValue = parseInt(month.value.trim(), 10)
        const yearValue = parseInt(year.value.trim(), 10)
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentDay = new Date().getDate()

        const ageYear = currentYear - yearValue
        const ageMonth = currentMonth - monthValue
        const ageDay = currentDay - dayValue

        function handleDay() {
            if (!isValidDate(dayValue, monthValue, yearValue)) {
                dayError.textContent = 'Invalid Date'
                return
            }
            
            if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
                years.textContent = ageYear - 1;
                months.textContent = 12 + ageMonth - (ageDay < 0 ? 1 : 0);
                days.textContent = ageDay < 0 ? 30 + ageDay : ageDay;
            } else {
                years.textContent = ageYear
                months.textContent = ageMonth
                days.textContent = ageDay
            }
        }
        handleDay()
        if (monthValue < 1 || monthValue > 12) {
            monthError.textContent = 'Month is required and must be between 1 and 12';
            return;
        }
        if (yearValue < 1 || yearValue > currentYear) {

            yearError.textContent = `year is required and must be between 1 and ${currentYear}`;
            return;
        }


    });
    function isValidDate(day, month, year) {
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
        }

        const parsedDate = new Date(year, month - 1, day);
        return (
            parsedDate.getDate() === day &&
            parsedDate.getMonth() === month - 1 &&
            parsedDate.getFullYear() === year
        );
    }

})