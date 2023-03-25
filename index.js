import { itemsArray } from './data.js'
import { ordersArray } from './data.js'

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        document.getElementById('cart').style.display = 'flex'
        pushNewOrder(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-btn'){
        document.getElementById('complete-order-pop-up').style.display = 'flex'
    }
    else if(e.target.id === 'cancel-btn'){
        document.getElementById('complete-order-pop-up').style.display = 'none'
    }
    else if(e.target.id === 'pay-btn'){
        document.getElementById('complete-order-pop-up').style.display = 'none'
        document.getElementById('cart').style.display = 'none'
        document.getElementById('finish').style.display = 'block'
        ordersArray.splice(0, ordersArray.length)
        document.getElementById('thank-you').textContent = getThankYouHtml()
        render()
    }
})

function getThankYouHtml(){
    let thankYouHtml = ''
    thankYouHtml = `Thank you for your order!`
    return thankYouHtml
}

function removeOrder(itemId){
    ordersArray.forEach(function(order, index){
        if(order.uuid === itemId){
            ordersArray.splice(index, 1)
        }
    })
    render()
}

function sumTotalPrice(){
    let sum = 0
    ordersArray.forEach(function(order){
       sum += order.price
    })
    return sum
}

function pushNewOrder(itemId){
    itemsArray.filter(function(item){
        if(item.uuid === itemId){
            ordersArray.push(item)
        }
    })
    render()
}

function getOrdersHtml(){
    let ordersHtml = ''
    ordersArray.forEach(function(order){
        ordersHtml += `
<div class="order">
    <h3>${order.name}</h3>
    <button class="remove-btn" id="remove-btn" data-remove="${order.uuid}">remove</button>
    <h4>$${order.price}</h4>
</div>  
`
    })
    return ordersHtml
}

function getItemsHtml() {
    let itemsHtml = ''
    itemsArray.forEach(function(item){
        itemsHtml += `
<div class="item" id="${item.uuid}">
    <img class="item-img" src="${item.image}" alt="${item.alt}">
        <div class="info">
            <h3>${item.name}</h3>
            <h4 class="brand">${item.brand}</h4>
            <p>${item.weight}</p>
            <h4>$${item.price}</h4>
        </div>
    <button class="add-btn btn" id="add-btn" data-add="${item.uuid}">Add to cart</button>
</div> 
`  
    });
    return itemsHtml
}

function render() {
    document.getElementById('items-menu').innerHTML = getItemsHtml()
    document.getElementById('orders-container').innerHTML = getOrdersHtml()
    document.getElementById('price-sum').textContent = `$${sumTotalPrice()}`
    if(ordersArray.length === 0){
        document.getElementById('cart').style.display = 'none'
    }
}

render()
