## Scripts

1. npm run build
2. npm run test
3. npm run start

## brief of usage:

This Project consists of two endpoints

1. The first endpoint is related to resize the image

   - Works on /api endpoint for example (http://localhost:3000/api?path=fjord&width=4444&height=5400)

   - It requires the path of image file,then width,height as Query string

   - Then resize the image depending on these parameters and sending it to the server

   - alternative way instead of sending the paramerts using query string is using the endpoint (http://localhost:3000/upload)

2. The Second endpoint is related to generate the image

   - Works on /placeholder endpoint for example (http://localhost:3000/placeholder?&width=444&height=500&red=238&green=238&blue=238)

   - It accepts width,height,red,blue,green as Query string

   - Then generatethe image depending on these parameters and sending it to the server

   - alternative way instead of sending the paramerts using query string is using the endpoint (http://localhost:3000/generate)
