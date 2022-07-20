const url = 'data.json';
const list = document.querySelector(".list");

//Days-Array 
const days =['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const d = new Date();
let currentDay = days[d.getDay()];

fetchData();
async function fetchData() {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showBarChart(respData);
}

function showBarChart(days) {
    days.forEach(day => {
        const listItems = document.createElement('li');
        listItems.innerHTML = `
            
            <div class="block">
                <p class="active-state">$${day.amount}</p>
            </div>
            <span>${day.day}</span>
        `;
        const block = listItems.querySelector(".block");
        const activeState = listItems.querySelector(".active-state");
        block.style.transform = `scaleY(${day.amount / 15})`;
        block.addEventListener('mouseenter', () => {
           activeState.classList.add('show');
        });
        block.addEventListener('mouseleave', () => {
            activeState.classList.remove('show');
        })
        // block.addEventListener('mouseup', () => {
        //     activeState.classList.add('show');
        // });
        // block.addEventListener('mousedown', () => {
        //     activeState.classList.remove('show');
        // })
        if(day.day === currentDay) {
           block.classList.add('today');
        }
        list.appendChild(listItems);
    })
}