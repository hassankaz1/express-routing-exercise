const items = require("./fakeDb")


const createItem = (name, price) => {
    let newItem = {
        "name" : name,
        "price" : price
    }

    items.push(newItem)

    return newItem
}

//return all items
const getAll = () => items;

//find item from items
const find = name => {
    const found = items.find( item => item["name"] === name)

    if(found === undefined){
        throw { message: "Not Found", status: 404 }
    }


    return found
}

//modify an item
const patchItem = (name, changes) => {
    let found = find(name)
    console.log(changes);
    
    if (found === undefined) {
        throw {message: "Not Found", status: 404}
    }
    if(changes["name"]) found["name"] = changes["name"];
    
    if(changes["price"]) found["price"] = changes["price"];
  
    return found;
}

//delete item
const remove = name => {
    let index = items.findIndex(item => item["name"] === name)

    if (index === -1) {
        throw {message: "Not Found", status: 404}
    }
    
    items.splice(index, 1);
}

module.exports = { createItem, getAll, find, patchItem, remove };





