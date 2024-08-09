function orderBurger(burgerType) {
    return new Promise((resolve, reject) => {
        console.log(`Starting to prepare your ${burgerType}`);
        setTimeout(() => {
            console.log(`${burgerType} is ready.`);
            // resolve(`Here is your order: ${burgerType}`);
            reject(`Here is your order: ${burgerType}`);
    }, 2000);
});
}

// console.log("Ordering burger...");
// orderBurger("Cheese Burger")
//     .then((order) => console.log(order))
//     .catch((err) => console.error("Error during order", err));
     

async function orderAndServe(burgerType) {
    try {
    console.log("Orderning burger...");
    const order = await orderBurger(burgerType);
    console.log(order);
    } catch (error) {
    console.error("Error during order", error);
    }
}

orderAndServe("Portobello Burger");