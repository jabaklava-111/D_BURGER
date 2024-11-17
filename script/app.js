const products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.price * this.amount
        }
    },
}

const productBtns = document.querySelectorAll('.wrapper__list-btn');
const basketBtnCount = document.querySelector('.warapper__navbar-count');
const basketBtn = document.querySelector('.wrapper__navbar-btn');
const basketModal = document.querySelector('.wrapper__navbar-basket');
const basketModalClose = document.querySelector('.wrapper__navbar-close');
const basketChecklist = document.querySelector('.wrapper__navbar-checklist');
const basketTotal = document.querySelector('.wrapper__navbar-totalprice');
const btnCard = document.querySelector('.wrapper__navbar-bottom'),
      print_body = document.querySelector('.print__body'),
      print__footer = document.querySelector('.print__footer')

basketBtn.addEventListener('click', () => basketModal.classList.toggle('active'))
basketModalClose.addEventListener('click', () => basketModal.classList.remove('active'))

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(btn)
    })
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card')
    products[parent.id].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in products) {
        let totalCount = 0
        const po = products[key]
        const productCard = document.querySelector(`#${key}`);
        const parentInd = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            parentInd.classList.add('active')
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentInd.innerHTML = po.amount
        } else {
            parentInd.classList.remove('active')
            parentInd.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
        basketChecklist.innerHTML = ''
    }

    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }

    const allCount = totalCountProducts()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    basketTotal.innerHTML = totalSummProducts().toLocaleString() + ' сум'
}
    
function cardItemBurger({img, name, price, amount}) {
    return `
            <div class="wrapper__navbar-product">
                <div class="wrapper__navbar-info">
                    <img src="${img}" alt="" class="wrapper__navbar-productImage">
                    <div>
                        <p class="wrapper__navbar-infoName">${name}</p>
                        <p class="wrapper__navbar-infoPrice">${price}</p>
                    </div>
                </div>
                <div class="wrapper__navbar-option" id="${name.toLowerCase()}_option">
                    <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
                    <output class="wrapper__navbar-count">${amount}</output>
                    <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
                </div>
            </div>
    `
}
window.addEventListener('click', e => {
    const btn = e.target
    if(btn.classList.contains('wrapper__navbar-symbol')){
      const parent = btn.closest('.wrapper__navbar-option')
      const attr   = btn.dataset.symbol
      if(parent){
        const idProduct = parent.id.split('_')[0]
        attr === '-' ? products[idProduct].amount-- : products[idProduct].amount++
        basket()        
      }
    }
})

function totalCountProducts() {
    let total = 0
    for (const key in products) {
        total += products[key].amount
    }
    return total
}

function totalSummProducts() {
    let total = 0
    for (const key in products) {
        total += products[key].totalSumm
    }
    return total
}

btnCard.addEventListener('click', function() {
    print_body.innerHTML = ''
    for(const key in products) {
        const {name, totalSumm, amount} = products[key]
        if(amount) {
            print_body.innerHTML += `<div class="print__body-item">
        <p class="print__body-item_name">
            <span class="name">${name}</span>
            <span class="count">${amount}</span>
        </p>
        <p class="print__body-item_summ">${totalSumm}</p>
    </div>`
        }
    }
    print__footer.innerHTML = totalSummProducts()
    window.print();
})