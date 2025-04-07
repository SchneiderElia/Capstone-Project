
export const getDashboard = (request, response, next) => {
    console.log('hello this is a dashboard route')
    response.send('hello this is a dashboard route')
    next()
}