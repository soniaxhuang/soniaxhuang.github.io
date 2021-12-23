const monthName = [
    { name: 'January'},
    { name: 'February'},
    { name: 'March'},
    { name: 'April'},
    { name: 'May'},
    { name: 'June'},
    { name: 'July'},
    { name: 'August'},
    { name: 'September'},
    { name: 'October'},
    { name:'November'},
    { name:'December'}
]
const colorArray = [
    { id: 'matcha1', color: 'rgb(172,205,170)'},
    { id: 'matcha2', color: 'rgb(185,224,185)'},
    { id: 'matcha3', color: 'rgb(115,147,141)'},
    { id: 'lilac1', color: 'rgb(164,149,212)'},
    { id: 'lilac2', color: 'rgb(206,142,214)'},
    { id: 'b1', color: 'rgb(234,215,196)'},
    { id: 'b2', color: 'rgb(185,149,111)'},
    { id: 'b3', color: 'rgb(121,86,48)'},
    { id: 'b4', color: 'rgb(69,43,17)'},
    { id: 'b5', color: 'rgb(92,113,149'}
]
let today = new Date();
let dayCount;
let year = today.getFullYear();
let thisYear = year;
let month = today.getMonth();
let thisMonth = month;
let day = today.getDay();
let thisDay = today.getDate();
let clickedDate;
let currentIndex;
let dateSave;
let thisMonthName = monthName[month].name;
let calendarMonth = document.querySelector('.month');
calendarMonth.innerText = thisMonthName;
let calendarYear = document.querySelector('.year');
calendarYear.innerHTML = year;
let rowTemplate = document.getElementById('row-template');
let rows = 6;
let notInMonth = 'rgba(185, 185, 185, 0.2)';
let addEntry = document.getElementById('addEntry');
let editTitle = document.getElementById('edit-title');
let editStart = document.getElementById('edit-start-time');
let editEnd = document.getElementById('edit-end-time');
let editDesc = document.getElementById('edit-event-desc');
let saveChanges = document.getElementById('save-changes');
let colorPick;
let colorRGB;
let previewColor = document.querySelector('.color-preview');
let modalTitle = document.getElementById('modalLabel');

window.onload = function(){
    GenMonth();
};
function HideAddModal(){
    $('#addEvent').modal('hide');
}
function HideEditModal(){
    $('#editEvent').modal('hide');
}
function GenMonth(){
    thisMonthName = monthName[month].name;
    calendarMonth.innerText = thisMonthName;
    calendarYear.innerText = year;
    dayCount = 1;
    let leftOverDays = 1;
    let cBody = document.querySelector('.calendarBody');
    cBody.innerHTML = "";
    let firstOfMonth = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month+1, 0).getDate();
    let daysInPrevMonth = new Date(year, month, 0).getDate();

    let dayDiff = daysInPrevMonth - firstOfMonth + 1;

    for (let row = 0; row < rows; row++){
        let cloneContent = rowTemplate.content.cloneNode(true);
        cloneContent.querySelector('.week-row');
        let cols = cloneContent.querySelectorAll('.col')
        cols.forEach(item => {
            let genDay = document.createElement('div')
            //reserve/set slots for days not in current month
            if (row == 0 && firstOfMonth > 0 && daysInPrevMonth +1 != dayDiff){
                item.innerText = (dayDiff);
                dayDiff++;
                item.style.backgroundColor = notInMonth;
                item.style.color = 'grey';
                item.addEventListener('click', () => {
                    PreviousMonth();
                })
            }
            //match month start day to currect date
            else if (dayCount < daysInMonth+1 ) {
                genDay.innerText = dayCount;
                genDay.classList.add('gen-day');
                item.appendChild(genDay);
                dayCount++;
                if (year == thisYear && month == thisMonth && dayCount == thisDay+1) {
                    genDay.classList.add('today-hl');
                    genDay.innerText += "✌🏻";
                }
                item.addEventListener('click', () => {
                    $('#addEvent').modal('show');
                    modalTitle.innerText = `${monthName[month].name} ${genDay.innerText}, ${year}`;
                    clickedDate = `${month.toString().padStart(2,0)}${genDay.innerText.padStart(2,0)}${year.toString().padStart(2,0)}`;
                })
            }
            else {
                item.innerText = leftOverDays;
                leftOverDays++;
                item.style.backgroundColor = notInMonth;
                item.style.color = 'grey';
                item.addEventListener('click', () => {
                    NextMonth();
                })
            }
            let checkItinerary = `${month.toString().padStart(2,0)}${genDay.innerText.padStart(2,0)}${year.toString().padStart(2,0)}`;
            if (JSON.parse(localStorage.getItem(checkItinerary))!= null) {
                let itinItems = JSON.parse(localStorage.getItem(checkItinerary));
                itinItems.forEach((itinx, index) => {
                    currentIndex = index;
                    let itin = document.createElement('div');
                    itin.classList.add('itin');
                    itin.style.backgroundColor = itinx.color;
                    itin.innerText = `${itinx.start} ${itinx.title}`;
                    item.append(itin);
                    itin.addEventListener('click', function(event){
                        event.stopPropagation();
                        $('#editEvent').modal('show');
                        let editModalLabel = document.getElementById('editModalLabel');
                        editModalLabel.innerHTML = `${monthName[month].name} ${genDay.innerText}, ${year}`;
                        editTitle.value = itinx.title;
                        editStart.value = itinx.start;
                        editEnd.value = itinx.end;
                        editDesc.value = itinx.desc;
                        let dateString = `${month.toString().padStart(2,0)}${genDay.innerText.padStart(2,0)}${year.toString().padStart(2,0)}`;
                        dateSave = dateString;
                        let editList = JSON.parse(localStorage.getItem(dateString));
                        saveChanges.addEventListener('click', () => {
                            if (editTitle.value != ""){
                                editList[index] = {
                                    title: editTitle.value,
                                    date: dateString,
                                    start: editStart.value,
                                    end: editEnd.value,
                                    desc: editDesc.value
                                };
                                itin.innerText = `${editList[index].start} ${editList[index].title}`;
                                localStorage.setItem(dateString, JSON.stringify(editList));
                                HideEditModal();
                            }
                            else{
                                
                            }
                            ResetEditModal();
                        })
                    })
                })
            }
        })
        cBody.append(cloneContent)
    }
}
//move to following month and renew calendar
function NextMonth(){
    month++;
    if (month > 11){
        year++;
        month=0;
    }
    GenMonth();
}
//move to previous month and renew calendar
function PreviousMonth(){
    month--;
    if (month < 0){
        year--;
        month=11;
    }
    GenMonth();
}
function ThisMonth(){
    month = thisMonth;
    year = thisYear;
    GenMonth();
}
let inputTitle = document.getElementById('event-title');
let startTime = document.getElementById('event-start-time');
let endTime = document.getElementById('event-end-time');
let eventDesc = document.getElementById('event-desc');
function ClearNewTodo(){
    inputTitle.value="";
    eventDesc.value="";
    previewColor.style.backgroundColor = 'white';
    colorRGB= 'rgb(172,205,170)';
}
function NewTodoItem(){
    let todoList = [];

    if (inputTitle.value != "") {
        let todoObj = {
            date: clickedDate,
            title: inputTitle.value,
            start: startTime.value,
            end: endTime.value,
            desc: eventDesc.value,
            color: colorRGB
        }
        if (localStorage.getItem(todoObj.date) == null) {
            todoList.push(todoObj);
        } else {
            todoList = JSON.parse(localStorage.getItem(todoObj.date));
            todoList.push(todoObj);
        }
        localStorage.setItem(todoObj.date, JSON.stringify(todoList));
        GenMonth();
        HideAddModal();
        ClearNewTodo();
    }
    else{
        alert("What we doin?");
    }
}
let deleteBtn = document.getElementById('delete');
deleteBtn.addEventListener('click', () => {
    let itemList = JSON.parse(localStorage.getItem(dateSave));
    itemList.splice(currentIndex, 1);
    localStorage.setItem(dateSave, JSON.stringify(itemList));
    GenMonth();
})
let editBtn = document.getElementById('edit-info');
editBtn.addEventListener('click', () => {
    saveChanges.classList.remove('d-none')
    editBtn.classList.add('d-none');
    editTitle.readOnly = false;
    editStart.readOnly = false;
    editEnd.readOnly = false;
    editStart.readOnly = false;
    editDesc.readOnly = false;
})
function ResetEditModal(){
    saveChanges.classList.add('d-none')
    editBtn.classList.remove('d-none');
    editTitle.readOnly = true;
    editStart.readOnly = true;
    editEnd.readOnly = true;
    editStart.readOnly = true;
    editDesc.readOnly = true;
}
function ColorName(){
    colorPick = event.srcElement.id;
    let findColor = colorArray.find(item => item.id == colorPick);
    
    colorRGB = findColor.color;
    previewColor.style.backgroundColor = colorRGB;
}
