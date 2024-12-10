import swaggerAutogen from "swagger-autogen";

const swaggerAutogenInstance = swaggerAutogen();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/server.js",
];

swaggerAutogen(outputFile, endpointsFiles);
