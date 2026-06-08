
let myLeads = []
const inputEl = document.getElementById("input-El")
const btnEl = document.getElementById("input-Btn")
let ulEl = document.getElementById("link-El")

localStorage.setItem("myLeads", myLeads[i])

btnEl.addEventListener("click", function() {
    const inputVal = inputEl.value;
    myLeads.push(inputVal)
    for(let i = 0; i < myLeads.length; i++) {
        localStorage.setItem("myLeads", myLeads[i])
    }
    ulEl.innerHTML = `<li> 
                            <a href="${ localStorage.getItem("myLeads") }" target="_blank">
                                ${localStorage.getItem("myLeads")} 
                            </a> 
                     </li>`
    inputEl.value = '';
})


