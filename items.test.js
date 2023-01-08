process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb")

let testItem = { name: "test", price:100 }

//insert dummy item
beforeEach(async () => {
  items.push(testItem)
});

//empty items
afterEach(async () => {
  items = []
});


//get items
describe("GET /items", function () {
  test("Gets a list of items in DB", async function () {
    const res = await request(app).get(`/items`);
    const { items } = res.body;
    expect(res.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});



//GET /items/[name] - return info about requested item `{item: item}` */
describe("GET /items/:name", function () {
  test("request info about single item", async function () {
    const res = await request(app).get(`/items/${testItem.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual(testItem);
  });

  test("Responds with 404 if can't find item", async function () {
    const res = await request(app).get(`/items/0`);
    expect(res.statusCode).toBe(404);
  });
});



//POST create new item using information in request body and return created item

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const res = await request(app)
      .post(`/items`)
      .send({
        name: "test2",
        price: 200
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toHaveProperty("name");
    expect(res.body.item).toHaveProperty("price");
    expect(res.body.item.name).toEqual("test2");
    expect(res.body.item.price).toEqual(200);
  });
});



//modify an existing item and return modified item

describe("PATCH /items/:name", function () {
  test("Updates an existing item", async function () {
    const res = await request(app)
      .patch(`/items/${testItem.name}`)
      .send({
        "name": "newName"
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({
      "name": "newName"
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const res = await request(app).patch(`/items/0`);
    expect(res.statusCode).toBe(404);
  });
});
// end


//delete an existing item and return deleted message
describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const res = await request(app)
      .delete(`/items/${testItem.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
});
// end

