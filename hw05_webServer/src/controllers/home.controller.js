export const getHomeController = (_, res) => {
    res.status(200)
        .set('Content-Type', 'text/plain')
        .send('Authorization header received');
} 

export const putHomeController = (_, res) => {
    res.status(200)
        .set('Content-Type', 'text/plain')
        .send('PUT request processed');
} 

export const deleteHomeController = (_, res) => {
    res.status(200)
        .set('Content-Type', 'text/plain')
        .send('DELETE request processed');
} 