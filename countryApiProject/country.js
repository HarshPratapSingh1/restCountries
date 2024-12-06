const countryName=new URLSearchParams(location.search).get('name');
const flagImg=document.querySelector('.content-container img');
const flagNameh1=document.querySelector('.content-container h1');
const nativeNames=document.querySelector('.nn');
const population=document.querySelector('.popu');
const region=document.querySelector('.reg');
const SubRegion=document.querySelector('.sub-reg');
const capital=document.querySelector('.capi');
const TopLevel=document.querySelector('.TLD');
const currency=document.querySelector('.cur');
const language=document.querySelector('.lang');
const borderBox=document.querySelector('.border-country');
const back=document.querySelector('.backButton')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>res.json())
.then(([element])=>{
//    console.log(element);
    flagImg.src=element.flags.svg
    flagNameh1.innerText=element.name.common
    if(element.name.nativeName!=null){
        nativeNames.innerText=Object.values(element.name.nativeName)[0].common
    }else {
        nativeNames.innerText=element.name.common
    }
    population.innerText=new Intl.NumberFormat('en-IN', {minimumFractionDigits: 0}).format(element.population)
    region.innerText=element.region
    if(element.Subregion)SubRegion.innerText=element.Subregion
    else SubRegion.innerText=element.region

    if(element.capital)capital.innerText=element.capital
    else capital.innerText=" NO-Capital "
    TopLevel.innerText=element.tld.join("  /  ")
    if(element.currencies)currency.innerText=Object.values(element.currencies).map((cur)=>cur.name).join("  /  ")
    else currency.innerText=" NO-Currency "

    if(element.languages)language.innerText=Object.values(element.languages).join("  /  ");


    if(element.borders){
        // console.log(element.borders);
        element.borders.forEach(country => {
            fetch(`https://restcountries.com/v3.1/alpha/${country}`).then((res)=>res.json())
            .then(([borderCountry])=>{
                const borderTag=document.createElement('a');
                borderTag.innerText=borderCountry.name.common
                borderTag.href=`country.html?name=${borderCountry.name.common}`
                borderBox.append(borderTag);
            })
        });
    }
})

back.addEventListener('click',()=>{
    history.back();
})


const Dark=document.querySelector('.theme');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
}
Dark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});