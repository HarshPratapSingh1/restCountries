const countryContainer=document.querySelector('.country-container');
const image=document.querySelector('img');
const filterByRegion=document.querySelector('.filter');
const searcher=document.querySelector('.search input');
const Dark=document.querySelector('.theme');

// Dark.addEventListener('click',()=>{
//     document.body.classList.toggle('dark')
// })
searcher.addEventListener('input',(e)=>{
    const a=AllData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCards(a);
})

let AllData;
fetch('https://restcountries.com/v3.1/all').then((res)=>res.json())
.then(data=>{
    renderCards(data);
    AllData=data;
})

filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then(res=>res.json())
    .then(renderCards)
})

function renderCards(data){
    countryContainer.innerHTML=''
        data.forEach(element => {
            
            const countryCard=document.createElement('a');
            countryCard.classList.add('country-card')
            countryCard.href=`\country.html?name=${element.name.common} `
            countryCard.innerHTML=`
            <img src='${element.flags.svg}'alt="flag">   
            <div class="txtDiv">
                <h3 class="card-title">${element.name.common}</h3>
                <p><b>Population</b><span> - ${new Intl.NumberFormat('en-IN', {minimumFractionDigits: 0}).format(element.population)}</span></p>
                <p><b>Region</b><span> - ${element.region}</span></p>
                <p><b>Capital</b><span> - ${element.capital}</span></p>
            </div>`
            countryContainer.append(countryCard)
})
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
}
Dark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    // if(isDarkMode==true){
    //     Dark.classList.add('.themelight')
    // }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});
