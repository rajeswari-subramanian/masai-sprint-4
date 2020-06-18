
var foodMenuArr1 = []
var ordered = []
var username = ""
var ord = {}
var invoice = 1
window.addEventListener('load', dispUser)
function dispUser() {
    var currUser = document.getElementById('currUser')
    var arr = localStorage.getItem("loginusers")
    arr = JSON.parse(arr)
    username = arr[arr.length - 1].name
    currUser.textContent = username
    disprestList()
}

function disprestList() {
    var restList = document.getElementById('restList')
    var arr = localStorage.getItem("restaurantitems") || "Empty"
    if (arr === "Empty") {
        foodMenuArr1 = []
    }
    else if (arr !== "Empty") {
        arr = JSON.parse(arr)
        foodMenuArr1 = arr
    }
    var option = document.createElement('option')
    option.value = ""
    option.textContent = " "
    restList.append(option)
    for (var i = 0; i < foodMenuArr1.length; i++) {
        var option = document.createElement('option')
        option.value = ""
        option.style.fontWeight = "bolder"
        for (key in foodMenuArr1[i]) {
            if (key === "Restaurant") {
                option.value = foodMenuArr1[i][key]
                option.textContent = foodMenuArr1[i][key]
                restList.append(option)
            }
        }
    }
}

restList.addEventListener('input', displayItem)

function displayItem() {
    var orderItem = document.getElementById("orderItem")
    orderItem.innerHTML = ""
    var div = document.createElement('div')
    var table = document.createElement('table')
    table.style.backgroundColor = "green"
    table.style.margin = "auto"
    table.style.fontWeight = "bolder"
    table.innerHTML = " "
    var thead = document.createElement("tr")
    var th1 = document.createElement("th")
    th1.textContent = "FoodItems"
    var th2 = document.createElement("th")
    th2.textContent = "UnitPrice"
    var th3 = document.createElement("th")
    th3.textContent = "Quantity"
    thead.append(th1, th2, th3)
    table.append(thead)
    var selected = event.target.value
    for (var i = 0; i < foodMenuArr1.length; i++) {
        if (foodMenuArr1[i].Restaurant === selected) {
            orderFood.call(foodMenuArr1, i, selected)
            var input1 = document.createElement('input')
            input1.id = "qty1"
            input1.type = "text"
            input1.style.width = "100px"
            var input2 = document.createElement('input')
            input2.id = "qty2"
            input2.type = "text"
            input2.style.width = "100px"
            var input3 = document.createElement('input')
            input3.id = "qty3"
            input3.type = "text"
            input3.style.width = "100px"

            var tr1 = document.createElement('tr')
            tr1.style.height = "40px"
            var tr2 = document.createElement('tr')
            tr2.style.height = "40px"
            var tr3 = document.createElement('tr')
            tr3.style.height = "40px"
            var td1 = document.createElement('td')
            td1.style.border = "2px dotted yellow"
            td1.style.width = "150px"
            td1.textContent = foodMenuArr1[i].item1
            var td2 = document.createElement('td')
            td2.style.border = "2px dotted yellow"
            td2.style.width = "150px"
            td2.textContent = foodMenuArr1[i].price1
            var td7 = document.createElement('td')
            td7.style.border = "2px dotted yellow"
            td7.style.width = "150px"
            td7.append(input1)
            tr1.append(td1, td2, td7)

            var td3 = document.createElement('td')
            td3.style.border = "2px dotted yellow"
            td3.style.width = "150px"
            td3.textContent = foodMenuArr1[i].item2
            var td4 = document.createElement('td')
            td4.style.border = "2px dotted yellow"
            td4.style.width = "150px"
            td4.textContent = foodMenuArr1[i].price2
            var td8 = document.createElement('td')
            td8.style.border = "2px dotted yellow"
            td8.style.width = "150px"
            td8.append(input2)
            tr2.append(td3, td4, td8)

            var td5 = document.createElement('td')
            td5.style.border = "2px dotted yellow"
            td5.style.width = "150px"
            td5.textContent = foodMenuArr1[i].item3
            var td6 = document.createElement('td')
            td6.style.border = "2px dotted yellow"
            td6.style.width = "150px"
            td6.textContent = foodMenuArr1[i].price3
            var td9 = document.createElement('td')
            td9.style.border = "2px dotted yellow"
            td9.style.width = "150px"
            td9.append(input3)
            tr3.append(td5, td6, td9)
            table.append(tr1, tr2, tr3)
        }
        div.append(table)
    }
    orderItem.append(div)
}

function orderFood(i, selected) {
    ord = {
        username: username,
        Restaurant: [{ name: selected },
        { item1: foodMenuArr1[i].item1 },
        { price1: foodMenuArr1[i].price1 },
        { item2: foodMenuArr1[i].item2 },
        { price2: foodMenuArr1[i].price2 },
        { item3: foodMenuArr1[i].item3 },
        { price3: foodMenuArr1[i].price3 }]
    }
}

var bill = document.getElementById('bill')
bill.addEventListener('click', readyBill)

function readyBill() {
    var day = new Date()
    var time = new Date()
    ord.day = day.toDateString()
    ord.time = time.toLocaleTimeString()
    var input1 = document.getElementById('qty1').value
    var input2 = document.getElementById('qty2').value
    var input3 = document.getElementById('qty3').value
    ord.qty1 = Number(input1)
    ord.qty2 = Number(input2)
    ord.qty3 = Number(input3)
    ord.total = ord.qty1 * ord.Restaurant[2].price1 + ord.qty2 * ord.Restaurant[4].price2 + ord.qty3 * ord.Restaurant[6].price3
    var arr = localStorage.getItem("userorder") || "Empty"
    if (arr === "Empty") {
        ord.invoice = invoice
        ordered.push(ord)
    }
    else if (arr !== "Empty") {
        arr = JSON.parse(arr)
        ordered = arr
        console.log("length", ordered[ordered.length - 1].invoice)
        ord.invoice = ordered[ordered.length - 1].invoice + 1
        ordered.push(ord)
    }
    localStorage.setItem("userorder", JSON.stringify(ordered))
    dispBill()
}

function dispBill() {
    var orderItem = document.getElementById("orderItem")
    var restList = document.getElementById('restListHead')
    var bill = document.getElementById('bill')
    orderItem.style.display = "none"
    restListHead.style.display = "none"
    bill.style.display = "none"
    billTable.style.display = "block"
    console.log("ord", ord)
    var title = document.getElementById('title')
    var i1 = document.getElementById('i1')
    var i2 = document.getElementById('i2')
    var i3 = document.getElementById('i3')
    var p1 = document.getElementById('p1')
    var q1 = document.getElementById('q1')
    var a1 = document.getElementById('a1')
    var p2 = document.getElementById('p2')
    var q2 = document.getElementById('q2')
    var a2 = document.getElementById('a2')
    var p3 = document.getElementById('p3')
    var q3 = document.getElementById('q3')
    var a3 = document.getElementById('a3')
    var total = document.getElementById('total')
    title.textContent = ord.Restaurant[0].name
    i1.textContent = ord.Restaurant[1].item1
    p1.textContent = ord.Restaurant[2].price1
    q1.textContent = ord.qty1
    a1.textContent = ord.qty1 * ord.Restaurant[2].price1

    i2.textContent = ord.Restaurant[3].item2
    p2.textContent = ord.Restaurant[4].price2
    q2.textContent = ord.qty2
    a2.textContent = ord.qty2 * ord.Restaurant[4].price2

    i3.textContent = ord.Restaurant[5].item3
    p3.textContent = ord.Restaurant[6].price3
    q3.textContent = ord.qty3
    a3.textContent = ord.qty3 * ord.Restaurant[6].price3
    total.textContent = ord.total
    ord = {}
}

var userOut = document.getElementById('userOut')
userOut.addEventListener('click', function () {
    window.location.href = "index.html"
})
