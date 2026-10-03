function calculateAge() {
    const dob = document.getElementById("dob").value;
    const tob = document.getElementById("tob").value;

    if (!dob || !tob) {
        document.getElementById("result").innerText =
            "Please enter your date and time of birth.";
        return;
    }

    const birthDate = new Date(`${dob}T${tob}`);
    const now = new Date();

    if (birthDate > now) {
        document.getElementById("result").innerText =
            "Birth date cannot be in the future.";
        return;
    }

    clearInterval(window.ageTimer);

    function updateAge() {
        const now = new Date();

        // Exact years, months and days
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;

            const previousMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Total time
        const difference = now - birthDate;

        const totalSeconds = Math.floor(difference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        document.getElementById("result").innerHTML = `
            <h2>Your Exact Age</h2>

            <h3>
                ${years} Years, 
                ${months} Months, 
                ${days} Days
            </h3>

            <p>${hours} Hours, ${minutes} Minutes, ${seconds} Seconds</p>

            <p>${totalDays.toLocaleString()} Total Days</p>
            <p>${totalHours.toLocaleString()} Total Hours</p>
            <p>${totalMinutes.toLocaleString()} Total Minutes</p>
            <p>${totalSeconds.toLocaleString()} Total Seconds</p>
        `;
    }

    updateAge();

    // Update every 1 second
    window.ageTimer = setInterval(updateAge, 1000);
}