var foodMenuArr = []
var userHistory = []
var totalCost = 0
var addItem = document.getElementById("addItem")
addItem.addEventListener('click', getItem)
function getItem() {
    event.preventDefault()
    var restName = document.getElementById("restName").value
    var item1 = document.getElementById("item1").value
    var price1 = document.getElementById("price1").value
    var item2 = document.getElementById("item2").value
    var price2 = document.getElementById("price2").value
    var item3 = document.getElementById("item3").value
    var price3 = document.getElementById("price3").value
    var arr = {
        Restaurant: restName,
        item1: item1,
        price1: Number(price1),
        item2: item2,
        price2: Number(price2),
        item3: item3,
        price3: Number(price3)
    }
    var arr1 = localStorage.getItem("restaurantitems") || "Empty"
    if (arr1 === "Empty") {
        foodMenuArr.push(arr)
    }
    else if (arr1 !== "Empty") {
        arr1 = JSON.parse(arr1)
        foodMenuArr = arr1
        foodMenuArr.push(arr)
    }
    localStorage.setItem("restaurantitems", JSON.stringify(foodMenuArr))
    displayFoodMenu()
}

function displayFoodMenu() {
    var arr1 = localStorage.getItem("restaurantitems") || "Empty"
    if (arr1 !== "Empty") {
        arr1 = JSON.parse(arr1)
        foodMenuArr = arr1
    }
    if (foodMenuArr !== []) {
        var foodMenu = document.getElementById("foodMenu")
        foodMenu.innerHTML = ""
        var div = document.createElement('div')
        var table = document.createElement('table')

        table.style.backgroundColor = "green"
        table.style.margin = "auto"
        table.style.fontWeight = "bolder"

        table.innerHTML = ""
        var thead = document.createElement("tr")
        var th1 = document.createElement("th")
        th1.textContent = "Restaurant"
        var th2 = document.createElement("th")
        th2.textContent = "Item1"
        var th3 = document.createElement("th")
        th3.textContent = "Price"
        var th4 = document.createElement("th")
        th4.textContent = "Item2"
        var th5 = document.createElement("th")
        th5.textContent = "Price"
        var th6 = document.createElement("th")
        th6.textContent = "Item3"
        var th7 = document.createElement("th")
        th7.textContent = "Price"
        thead.append(th1, th2, th3, th4, th5, th6, th7)
        table.append(thead)
        for (var i = 0; i < foodMenuArr.length; i++) {
            var tr = document.createElement('tr')
            tr.style.height = "40px"
            for (key in foodMenuArr[i]) {
                var td = document.createElement('td')
                td.style.border = "2px dotted yellow"
                td.style.width = "150px"
                td.textContent = foodMenuArr[i][key]
                tr.append(td)
            }
            table.append(tr)
            div.append(table)
        }
        foodMenu.append(div)
    }
}

var atag = document.getElementById('atag')
atag.addEventListener("click", dispHistory)

function dispHistory() {
    var top = document.querySelectorAll(".top")
    var div = document.createElement("div")
    top[0].style.display = "none"
    top[1].style.display = "none"
    top[2].style.display = "none"
    var history = document.getElementById('history')
    var cards = document.getElementById('cards')
    cards.innerHTML = ""
    history.style.display = "block"
    var arr = localStorage.getItem("userorder") || "Empty"
    if (arr === "Empty") {
        userHistory = []
    }
    else if (arr !== "Empty") {
        arr = JSON.parse(arr)
        userHistory = arr
    }
    for (var i = 0; i < userHistory.length; i++) {
        var div = document.createElement('div')
        div.innerHTML = ""
        var p1 = document.createElement('p')
        p1.style.backgroundColor = "yellow"
        var p2 = document.createElement('p')
        var p3 = document.createElement('p')
        var p4 = document.createElement('p')
        div.style.borderWidth = "2px"
        div.style.borderColor = "black"
        div.style.borderStyle = "solid"
        div.style.margin = "2px"
        p1.textContent = userHistory[i].Restaurant[0].name
        p2.textContent = userHistory[i].day + "," + userHistory[i].time
        p3.textContent = "#invoice" + ":" + userHistory[i].invoice
        p4.textContent = "Total" + ":" + userHistory[i].total
        totalCost = totalCost + userHistory[i].total
        div.append(p1, p2, p3, p4)
        cards.append(div)
    }
    var tCost = document.getElementById('tCost')
    tCost.textContent = "Today's Total Sale for SMART KITCHEN " + ":" + totalCost
}

var adminOut = document.getElementById('adminOut')
adminOut.addEventListener('click', function () {
    window.location.href = "index.html"
})

window.addEventListener("load", displayFoodMenu)