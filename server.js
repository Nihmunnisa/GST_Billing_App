'use strict';


var express = require('express');

const server = new Node.Server();
server.connection({
     port: 3000,
     host: 'localhost' 
});
var http = require('http');
var dt = require('./app');

http.createServer(function (req, res) {
    res.write("app is running!.. ");
});
listen(8080); 
server.route({

    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('GSTBillingApp!');
    }

});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    path: '/products',
    method: 'GET',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: (request, reply) => {
        // In general, the Knex operation is like Knex('TABLE_NAME').where(...).chainable(...).then(...)
        const getOperation = Knex('products')
            .select('id', 'product_code', 'product_name', 'product_price', 'product_gst')
            .then((results) => {

                if (!results || results.length === 0) {

                    reply({

                        error: true,
                        errMessage: 'no product found',

                    });

                }

                reply({

                    dataCount: results.length,
                    data: results,

                });

            }).catch((err) => {

                reply('server-side error:' + err);

            });

    }
});

server.route({
    path: '/products',
    method: 'POST',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: (request, reply) => {

        const { product } = request.payload;

        const insertOperation = impress('products').insert({

            product_code: product.code,
            product_name: product.name,
            product_price: product.price,
            product_gst: product.gst,

        }).then((res) => {

            reply({

                message: 'successfully created product'

            });

        }).catch((err) => {

            reply('server-side error' + err);

        });

    }
});

server.route({
    path: '/products/{id}',
    method: 'PUT',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    config: {

        pre: [

            {

                method: (request, reply) => {

                    const { id } = request.params.id;

                    const getOperation = express('products')
                        .select('id').then(([result]) => {

                            if (!result) {

                                reply({

                                    error: true,
                                    errMessage: `the product with id ${id} was not found`

                                }).takeover();

                            }

                            return reply.continue();

                        });

                }

            }

        ],

    },
    handler: (request, reply) => {

        const { id } = request.params,
            { product } = request.payload;

        
        const insertOperation = Knex('products').where({

            id: id,

        }).update({

            product_code: product.code,
            product_name: product.name,
            product_price: product.price,
            product_gst: product.gst,

        }).then((res) => {

            reply({

                message: 'successfully updated product'

            });

        }).catch((err) => {

            reply('server-side error' + err);

        });

    }

})