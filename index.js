let myLeads=[]
const saveEl= document.getElementById("save-btn")
const saveTabEL= document.getElementById("saveTab-btn")
const deleteEl= document.getElementById("delete-btn")
const inputEl=document.getElementById("input-el")
const ulEl= document.getElementById("ul-el")
const storedEl= JSON.parse(localStorage.getItem("myLeads")) 
if(storedEl){
    myLeads=storedEl
    render(myLeads)
}

saveEl.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
    
})
saveTabEL.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

})

deleteEl.addEventListener("dblclick", function(){
    myLeads=[]
    localStorage.clear()
    render(myLeads)
})
function render(leads){
    let myList=""

    for(let i=0; i<leads.length; i++){
        myList+= `
        <li> 

        <a href='${leads[i]}' target='_blank' >
        ${leads[i]}
        </a> 

        </li>`

        }
    ulEl.innerHTML= myList
}
