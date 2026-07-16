// vip.js

const vipPlans = [
    {
        vip: "VIP 1",
        investment: 3000,
        dailyIncome: 750,
        totalIncome: 67500,
        duration: 90
    },
    {
        vip: "VIP 2",
        investment: 7000,
        dailyIncome: 1750,
        totalIncome: 157500,
        duration: 90
    },
    {
        vip: "VIP 3",
        investment: 15000,
        dailyIncome: 3750,
        totalIncome: 337500,
        duration: 90
    },
    {
        vip: "VIP 4",
        investment: 30000,
        dailyIncome: 7500,
        totalIncome: 675000,
        duration: 90
    },
    {
        vip: "VIP 5",
        investment: 50000,
        dailyIncome: 12500,
        totalIncome: 1125000,
        duration: 90
    }
];


const vipContainer = document.getElementById("vipContainer");


if (vipContainer) {

    vipPlans.forEach((plan) => {

        const card = document.createElement("div");

        card.className = "vip-card";

        card.innerHTML = `
            <h2>${plan.vip}</h2>

            <p>
            💰 Investment:
            ₦${plan.investment.toLocaleString()}
            </p>

            <p>
            📅 Daily Task:
            ₦${plan.dailyIncome.toLocaleString()}
            </p>

            <p>
            📈 Total Income:
            ₦${plan.totalIncome.toLocaleString()}
            </p>

            <p>
            ⏳ Duration:
            ${plan.duration} Days
            </p>

            <button onclick="selectVIP('${plan.vip}')">
                Invest Now
            </button>
        `;


        vipContainer.appendChild(card);

    });

}


function selectVIP(vipName){

    localStorage.setItem("selectedVIP", vipName);

    window.location.href = "dashboard.html";

}
