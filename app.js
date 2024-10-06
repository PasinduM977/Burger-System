


// Product arrays
//fries array
let fArray = [
    {
        pName: "Steak Fries (Large) ",
        pCode: "B1025 ",
        pPrice: 1200,
        discount: 0

    },
    {
        pName: "Steak Fries (Medium) ",
        pCode: "B1026 ",
        pPrice: 600,
        discount: 0

    },
    {
        pName: "French Fries (Large) ",
        pCode: "B1027 ",
        pPrice: 800,
        discount: 0

    },
    {
        pName: "French Fries (Medium)",
        pCode: "B1028",
        pPrice: 650,
        discount: 0

    },
    {
        pName: "French Fries (Small) ",
        pCode: "B1029 ",
        pPrice: 450,
        discount: 0

    },
    {
        pName: "Sweet Potato Fries (Large)",
        pCode: "B1030",
        pPrice: 600,
        discount: 0

    }
]

//Pasta array
let pArray = [
    {
        pName: "Chicken n Cheese Pasta",
        pCode: "B1031 ",
        pPrice: 1600,
        discount: 0.15

    },
    {
        pName: "Chicken Penne Pasta ",
        pCode: "B1032",
        pPrice: 1700,
        discount: 0

    },
    {
        pName: "Ground Turkey Pasta Bake ",
        pCode: "B1033",
        pPrice: 2900,
        discount: 0.1

    },
    {
        pName: "Creamy Shrimp Pasta",
        pCode: "B1034",
        pPrice: 2000,
        discount: 0

    },
    {
        pName: "Lemon Butter Pasta",
        pCode: "B1035",
        pPrice: 1950,
        discount: 0

    },
    {
        pName: "Tagliatelle Pasta",
        pCode: "B1036",
        pPrice: 2400,
        discount: 0.01

    },
    {
        pName: "Baked Ravioli",
        pCode: "B1037",
        pPrice: 2000,
        discount: 0.01

    }
]

//Bevarages array
let bArray = [
    {
        pName: "Pepsi (330ml)",
        pCode: "B1044 ",
        pPrice: 990,
        discount: 0.05

    },
    {
        pName: "Coca-Cola (330ml)",
        pCode: "B1045",
        pPrice: 1230,
        discount: 0

    },
    {
        pName: "Sprite (330ml)",
        pCode: "B1046",
        pPrice: 1500,
        discount: 0.03

    },
    {
        pName: "Mirinda (330ml)",
        pCode: "B1047",
        pPrice: 850,
        discount: 0.07

    }
]

 //adding food to session storage
 //localStorage.setItem("FriesArray",JSON.stringify(fArray));
 //localStorage.setItem("PastaArray",JSON.stringify(pArray));
// localStorage.setItem("bevaragesArray",JSON.stringify(bArray));




// adding fries to lobby
function loadItems()
{

   //getting food from local storage
if(sessionStorage.getItem("FriesArray")==null)
{
let friesArray=JSON.parse(localStorage.getItem("FriesArray"))
let pastaArray=JSON.parse(localStorage.getItem("PastaArray"))
let bevaragesArray=JSON.parse(localStorage.getItem("bevaragesArray")) 

//adding food to session storage
sessionStorage.setItem("FriesArray",JSON.stringify(friesArray));
sessionStorage.setItem("PastaArray",JSON.stringify(pastaArray));
sessionStorage.setItem("bevaragesArray",JSON.stringify(bevaragesArray));
}


//getting food from session storage
let friesArray=JSON.parse(sessionStorage.getItem("FriesArray"))
let pastaArray=JSON.parse(sessionStorage.getItem("PastaArray"))
let bevaragesArray=JSON.parse(sessionStorage.getItem("bevaragesArray")) 




    let productFries = document.getElementById("productFries");


    friesArray.forEach((fries) => {
        
        productFries.innerHTML += `
                                    <div class="card" onclick="addItemsToCart('${fries.pName}','${fries.pPrice}','${fries.discount}')">
                                        <div class="card-body d-flex justify-content-around">
                                          <p id="pCode">${fries.pCode}</p> <p id="pName">${fries.pName}</p> <p id="pPrice">${fries.pPrice}</p>
                                        </div>
                                      </div>
    `
    
    
    
    })
    
    
    // adding Pasta to lobby
    
    let productPasta = document.getElementById("productPasta");
    
    pastaArray.forEach((pasta) => {
        productPasta.innerHTML += `
                                    <div class="card" onclick="addItemsToCart('${pasta.pName}','${pasta.pPrice}','${pasta.discount}')">
                                        <div class="card-body d-flex justify-content-around">
                                          <p>${pasta.pCode}</p> <p>${pasta.pName}</p> <p>${pasta.pPrice}</p>
                                        </div>
                                      </div>
    `
    
    
    })
    
    // adding Bavarages to lobby
    
    let productBevarages = document.getElementById("productBevarages");
    
    bevaragesArray.forEach((bevarage) => {
        productBevarages.innerHTML += `
                                    <div class="card" onclick="addItemsToCart('${bevarage.pName}','${bevarage.pPrice}','${bevarage.discount}')">
                                        <div class="card-body d-flex justify-content-around">
                                          <p>${bevarage.pCode}</p> <p>${bevarage.pName}</p> <p>${bevarage.pPrice}</p>
                                        </div>
                                      </div>
    `
    
    
    })

}


//adding cart to clicked item...

let cartItems = document.getElementById("cartItems");
let cartArray = [];


function addItemsToCart(name,price,discount) {

//for initial item
    if (cartArray.length==0) {

        let cartItem = {
            name: name,
            price: price,
            qty: 1,
            discount:discount*price
        }

        cartArray.push(cartItem);

        addcartItemsFromCartArray(price,discount);
    }
//for duplicate items
    else if(isDuplicated(name))
    {
       
        cartArray.forEach((cartItem)=>{

            if (cartItem.name==name) {
                cartItem.qty++;
                cartItem.price=cartItem.qty*price;
                cartItem.discount=discount*price*cartItem.qty
                cartItems.innerHTML=null;
                addcartItemsFromCartArray(price,discount);
                 
            }



        })


    }
//for non duplicate items
    else
    {
        let cartItem = {
            name: name,
            price: price,
            qty: 1,
            discount:discount*price
        } 

        cartArray.push(cartItem);
        cartItems.innerHTML=null;
        addcartItemsFromCartArray(price,discount);
        
        
    }
    
}

//display array items in Cart

function addcartItemsFromCartArray(price,discount) {

    cartArray.forEach((cartItem,index)=>{
        
        cartItems.innerHTML += `
        <div class="card" >
            <div class="card-body d-flex justify-content-around" >
                <p>${cartItem.name}</p>
                <p>${cartItem.qty}</p>
                <p>${cartItem.price}</p> 
                <button type="button" class="btn btn-danger" onclick="reduceQty('${index}','${price}','${discount}')">-</button>
            </div>
        </div>
       ` 


    })
    setCosting();
    
}

//check item is already in the Cart Array

function isDuplicated(name) {
    
   for (let index = 0; index < cartArray.length; index++) {

    if (cartArray[index].name==name) {
       return true; 
    }
   }
     
    return false;
    
    
}

//reduce Qty

function reduceQty(index,price,discount)
{


cartArray[index].qty--;
cartArray[index].price=cartArray[index].qty*price;
cartArray[index].discount=discount*price*cartArray[index].qty
cartItems.innerHTML=null;
addcartItemsFromCartArray(price,discount);

if (cartArray[index].qty==0)
     {
    cartArray.splice(index,1);
    cartItems.innerHTML=null;
    addcartItemsFromCartArray(price,discount);
    }



}

//calculate total cost, discount and final cost

let finalCost=document.getElementById("finalCost");
let discount=document.getElementById("discount");
let totalCost=document.getElementById("totalCost");



function setCosting() {
    let tCost=0;
    let dis=0;   
for (let index = 0; index < cartArray.length; index++) {
    tCost+=parseInt(cartArray[index].price);
    dis+=parseFloat(cartArray[index].discount);
    
}
    
   totalCost.innerText=tCost;
    discount.innerText=dis;
    finalCost.innerText=tCost-dis;
    TotCost=tCost;
    Dis=dis;
    
}



//add customer details

let customerArray=[];
let cusId=0;


function addCustomer(name,pn) {

    let customer={
        id:"C"+(++cusId),
        name:name,
        phonenumber:pn

    }

    customerArray.push(customer);
    sessionStorage.setItem("customerArray",JSON.stringify(customerArray));
    
}

//creating item array
let items=[];
function makeItemArray() {
    
    cartArray.forEach((cartItem)=>{
        items.push(cartItem.name);
    
    })   
}


//add order details


let orderDetails=[];
let orderId=0;

function addOrder() {

    let order={
        id:"O"+(++orderId),
        customer:cusName.value,
        items:items,
        totalDiscount:Dis,
        totalAmount:TotCost
    }

    orderDetails.push(order);
    
}




//Place Order

let TotCost;
let Dis;
let cusName=document.getElementById("cusName");
let pNumber=document.getElementById("pNumber");



function placeOrder()
{
    addCustomer(cusName.value,pNumber.value);
    makeItemArray();
    addOrder();
    
    //adding data to session storage
    sessionStorage.setItem("orderDetails",JSON.stringify(orderDetails));
    
    
}

/////////////////////////////////////////////////////session storage////////////////////////////////////////
//load Orders

function loadOrders()
{
    let tableBody=document.getElementById("tableBody");  
    
    //load data from session storage
    JSON.parse(sessionStorage.getItem("orderDetails")).forEach((order)=>{

        tableBody.innerHTML+= `<tr>
                                 <td>${order.id}</td>
                                <td>${order.customer}</td>
                                <td>${order.items}</td>
                                <td>${order.totalDiscount}</td>
                                <td>${order.totalAmount}</td>
                                </tr>`
    })

    
}

// search order

function searchOrder()
{
    
    
    let txtSearchOrder=document.getElementById("txtSearchOrder");

    let modalBody=document.getElementById("modalBody");

    let orderDetails=JSON.parse(sessionStorage.getItem("orderDetails"))
        
    orderDetails.forEach((order,index)=>{
            
            if (txtSearchOrder.value===order.id) {
                
                modalBody.innerHTML=`               <p>Name: ${orderDetails[index].id}</p>
                                                    <p>Code: ${orderDetails[index].customer} </p>
                                                    <p>Price: ${orderDetails[index].items}</p>
                                                    <p>Discount: ${orderDetails[index].totalDiscount}</p>
                                                    <p>Discount: ${orderDetails[index].totalAmount}</p>`
                
            }
        })

}

//load library
let libProducts=document.getElementById("libProducts");



function loadData()
{
//getting food from session storage
let friesArray=JSON.parse(sessionStorage.getItem("FriesArray"))
let pastaArray=JSON.parse(sessionStorage.getItem("PastaArray"))
let bevaragesArray=JSON.parse(sessionStorage.getItem("bevaragesArray")) 

    allProductArray=[];
    friesArray.forEach(fries=>{
    
        allProductArray.push(fries);
    })
    
    pastaArray.forEach(pasta=>{
    
        allProductArray.push(pasta);
    })
    
    bevaragesArray.forEach(bev=>{
    
        allProductArray.push(bev);
    })

    
    allProductArray.forEach(all=>{

        libProducts.innerHTML+=`<div class="card">
        <div class="card-body d-flex justify-content-around">
            <p>${all.pCode}</p>
            <p>${all.pName}</p> 
            <button type="button" onclick="reduceProduct('${all.pCode}')" class="btn btn-danger">-</button>
        </div>
    </div>`

    })

    //getting customers from session storage

   /* let libcustomers=document.getElementById("libcustomers");
    JSON.parse(sessionStorage.getItem("customerArray")).forEach(customer=>{
libcustomers.innerHTML+=`<div class="card">
                            <div class="card-body d-flex justify-content-around">
                                <p>${customer.id}</p>
                                <p>${customer.name}</p> 
                                <p>${customer.phonenumber}</p> 
                                <button type="button" onclick="reduceCustomer('${customer.id}')" class="btn btn-danger">-</button>
                            </div>
                        </div>`


    })*/
    

}

//reduce customer
function reduceCustomer(id)
{
   let customerArray=JSON.parse(sessionStorage.getItem("customerArray"));

   customerArray.forEach((customer,index)=>{

if (id===customer.id) {
    customerArray.splice(index,1);
    sessionStorage.setItem("customerArray",customerArray);
    loadData();
}

   })
    
}


//reduce product
function reduceProduct(pCode)
{
    //getting food from session storage
    let friesArray=JSON.parse(sessionStorage.getItem("FriesArray"))
    let pastaArray=JSON.parse(sessionStorage.getItem("PastaArray"))
    let bevaragesArray=JSON.parse(sessionStorage.getItem("bevaragesArray")) 

    friesArray.forEach((fries,index)=>{

        if (fries.pCode==pCode) {
            friesArray.splice(index,1); 
            sessionStorage.setItem("FriesArray",JSON.stringify(friesArray));

            loadData();
        }
    })
    
    pastaArray.forEach((pasta,index)=>{
    
        if (pasta.pCode==pCode) {
            pastaArray.splice(index,1);
            sessionStorage.setItem("PastaArray",JSON.stringify(pastaArray));

            loadData();
        }
    })
    
    bevaragesArray.forEach((bev,index)=>{
    
        if (bev.pCode==pCode) {
            bevaragesArray.splice(index,1); 
            sessionStorage.setItem("bevaragesArray",JSON.stringify(bevaragesArray)); 
            loadData();
        }
    }) 
    libProducts.innerHTML=null;
    loadData()
    
}

//search product



function searchItem() {

    let txtSearch=document.getElementById("txtSearch");

let modalBody=document.getElementById("modalBody");

    allProductArray=[];
    friesArray.forEach(fries=>{
    
        allProductArray.push(fries);
    })
    
    pastaArray.forEach(pasta=>{
    
        allProductArray.push(pasta);
    })
    
    bevaragesArray.forEach(bev=>{
    
        allProductArray.push(bev);
    })
    
    allProductArray.forEach((item,index)=>{
        
        if (txtSearch.value===item.pCode) {
            modalBody.innerHTML=`               <p>Name: ${allProductArray[index].pName}</p>
                                                <p>Code: ${allProductArray[index].pCode} </p>
                                                <p>Price: ${allProductArray[index].pPrice}</p>
                                                <p>Discount: ${allProductArray[index].discount}</p>`
            
        }
    })
    
}