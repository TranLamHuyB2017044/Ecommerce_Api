const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger Shoes Store',
        version: '1.0.0',
        description: 'Documentation for shoes store ecommerce project'
    },
    servers: [
        {
            url: 'https://tranlamhuy-be-ecommerce.onrender.com',
            description: 'Development server'
        }
    ]
}

module.exports = swaggerDefinition;