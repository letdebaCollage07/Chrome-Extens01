


let myLeads = JSON.parse(localStorage.getItem("myLeads")) || []
const inputEl = document.getElementById("input-El")
const btnEl = document.getElementById("input-Btn")
const ulEl = document.getElementById("link-El")
const deleteBtn = document.getElementById("clear-Btn")
const tab = document.getElementById("saveTab-Btn")

if (myLeads) {
    render(myLeads)
}


btnEl.addEventListener("click", function(event) {
    event.preventDefault()
    const inputVal = inputEl.value;
    myLeads.push(inputVal)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = ""; 
})


//*reuseable
function render(leads) {
    let listItem = ""
    for(let i = 0; i < leads.length; i++) {
        listItem += `<li> 
                        <a href="${leads[i]}" target="_blank">
                            ${leads[i]} 
                        </a> 
                    </li>`
    }
    ulEl.innerHTML = listItem;
}



deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
    ulEl.innerHTML = "";
})

tab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})