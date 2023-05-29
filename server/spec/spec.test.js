const request = require('supertest');
const app = require('../index.js');

const productData = require('./productData.js');

const {Client} = require('pg');

const config = require('../../config.js');

const db = new Client({
	user: config.post_user,
	host: 'localhost', //Might need to fix when running inside of docker
	database: config.post_db,
	password: config.post_pass,
	port: config.post_port
});

beforeAll(async () => {
  const client = await db.connect();
});

describe('GET /products', () => { //----------------------Product list

  it('should return status code of 200', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
  });

  it ('should return an array with length 5', async () => {
    const response = await request(app).get('/products');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(5);
  });

  it ('should return an array of objects', async() => {
    const response = await request(app).get('/products');
    for (var i = 0; i < response.body.length; i++) {
      expect(typeof(response.body[i])).toBe('object');
    }
  });

  it ('should return the correct data', async () => {
    const response = await request(app).get('/products')
    expect(response.body).toEqual(productData.default);
  });

  it ('should return the correct count when given count, page, or both', async () => {
    var response = await request(app).get('/products/?count=10');
    expect(response.body.length).toBe(10);
    response = await request(app).get('/products/?page=2');
    expect(response.body.length).toBe(5);
    response = await request(app).get('/products/?page=2&count=20');
    expect(response.body.length).toBe(20);
  });

  it ('should return the correct data when given count, page, or both', async () => {
    var response = await request(app).get('/products/?count=15');
    expect(response.body).toEqual(productData.count15);
    response = await request(app).get('/products/?page=5');
    expect(response.body).toEqual(productData.page5);
    response = await request(app).get('/products/?page=3&count=30');
    expect(response.body).toEqual(productData.page3_count30);
  });
});

describe('/products/:product_id', () => {  //---------------------------------- Product Info
  it ('should return status code of 200 given product id 1', async () => {
    var response = await request(app).get('/products/1');
    expect(response.statusCode).toBe(200);
  });

  it ('should error when given invalid syntax for product id', async () => {
    var response = await request(app).get('/products/id1');

    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Error: Invalid product id provided');
  });

  it ('should return an object with correct id', async () => {
    for (var i = 1000; i < 1500; i++) {
      var response = await request(app).get(`/products/${i}`);
      expect(typeof(response)).toBe('object');
      expect(response.body.id).toBe(i);
    }
  });

  it ('should return product even when it has no features', async () => {
    var response = await request(app).get('/products/10');
    expect(response.body.id).toBe(10);
    expect(response.body.features).toEqual([]);
    expect(response.body.name).toBe('Infinity Stone');
  });

  it ('should return the correct product', async () => {
    var response = await request(app).get('/products/56789');
    expect(response.body).toEqual(productData.id_56789);
    response = await request(app).get('/products/86456');
    expect(response.body).toEqual(productData.id_86456);
  });

});

describe('/products/:product_id/styles', () => {
  it ('should return status code of 200 with product id 1' , async () => {
    var response = await request(app).get('/products/1/styles');
    expect(response.statusCode).toBe(200);
  });

  it ('should error when given invalid syntax for product id', async() => {
    var response = await request(app).get('/products/1f/styles');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Error: Invalid product id provided');
  });

  it ('should return an object with correct id', async () => {
    for (var i = 1000; i < 1200; i++) {
      var response = await request(app).get(`/products/${i}/styles`);
      expect(typeof(response)).toBe('object');
      expect(Number(response.body.product_id)).toBe(i);
    }
  });

  it ('should return product id and empty styles array when product has no styles' , async () => {
    var response = await request(app).get('/products/1000/styles');
    expect(Number(response.body.product_id)).toBe(1000);
    expect(response.body.results).toEqual([]);
  });


  it ('should return the correct styles', async () => {
    var response = await request(app).get('/products/7564/styles');
    expect(response.body).toEqual(productData.styles_7564);
    var response = await request(app).get('/products/10956/styles');
    expect(response.body).toEqual(productData.styles_10956);
  });

});

describe('/products/:product_id/related', () => {
  it ('should return status code of 200 with product id 1' , async () => {
    var response = await request(app).get('/products/1/related');
    expect(response.statusCode).toBe(200);
  });

  it ('should return an array', async () => {
    for (var i = 5670; i < 5690; i++) {
      var response = await request(app).get(`/products/${i}/related`);
      expect(Array.isArray(response.body)).toBe(true);
    }
  });

  it ('should return an empty array with no related products', async () => {
    var response = await request(app).get('/products/10/related');
    expect(response.body).toEqual([]);
  });

  it ('should return the correct related products', async () => {
    var response = await request(app).get('/products/1890/related');
    expect(response.body).toEqual([1269,1281,791,306,955]);
    response = await request(app).get('/products/106780/related');
    expect(response.body).toEqual([1481,1992,93263,29540,44475]);
  });

});
