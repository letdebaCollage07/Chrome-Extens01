


let myLeads = JSON.parse(localStorage.getItem("myLeads")) || []
const inputEl = document.getElementById("input-El")
const btnEl = document.getElementById("input-Btn")
const ulEl = document.getElementById("link-El")
const deleteSelectedBtn = document.getElementById("delete-selected-Btn")
const tab = document.getElementById("saveTab-Btn")

if (myLeads) {
    render(myLeads)
}


btnEl.addEventListener("click", function(event) {
    event.preventDefault()
    const inputVal = inputEl.value;
    if (inputVal.trim() !== "") {
        myLeads.push(inputVal)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        inputEl.value = ""; 
    }
})


// Extract domain name from URL
function getDomainName(url) {
    try {
        // Check if it's a valid URL format
        let urlObj;
        if (url.startsWith('http://') || url.startsWith('https://')) {
            urlObj = new URL(url);
        } else if (url.includes('.')) {
            // Assume it's a domain without protocol
            urlObj = new URL('https://' + url);
        } else {
            // It's not a URL, return as is
            return url;
        }
        
        // Get hostname and extract domain name
        let hostname = urlObj.hostname;
        // Remove 'www.' prefix if exists
        let domain = hostname.replace('www.', '');
        // Get just the domain name (first part before the first dot)
        let domainName = domain.split('.')[0];
        
        return domainName.charAt(0).toUpperCase() + domainName.slice(1);
    } catch (error) {
        // If URL parsing fails, return original
        return url;
    }
}

// Add protocol if missing
function ensureProtocol(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'https://' + url;
    }
    return url;
}

//*reuseable
function render(leads) {
    let listItem = ""
    for(let i = 0; i < leads.length; i++) {
        const displayText = getDomainName(leads[i]);
        const linkUrl = ensureProtocol(leads[i]);
        listItem += `<li data-index="${i}"> 
                        <input type="checkbox" class="lead-checkbox" data-index="${i}">
                        <a href="${linkUrl}" target="_blank">
                            ${displayText} 
                        </a> 
                    </li>`
    }
    ulEl.innerHTML = listItem;
    
    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.lead-checkbox')
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const listItem = this.parentElement
            if (this.checked) {
                listItem.classList.add('selected')
            } else {
                listItem.classList.remove('selected')
            }
        })
    })
}

// Delete selected leads
deleteSelectedBtn.addEventListener("click", function(){
    const checkboxes = document.querySelectorAll('.lead-checkbox:checked')
    
    if (checkboxes.length === 0) {
        alert('Please select at least one lead to delete')
        return
    }
    
    // Get indices in reverse order to avoid index shifting
    const indicesToDelete = Array.from(checkboxes)
        .map(checkbox => parseInt(checkbox.dataset.index))
        .sort((a, b) => b - a)
    
    // Remove items from array
    indicesToDelete.forEach(index => {
        myLeads.splice(index, 1)
    })
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})