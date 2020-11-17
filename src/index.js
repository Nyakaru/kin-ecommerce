//@ts-check
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerJsonDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import routes from "./routeHandler";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Documenting REST API's",
      description:
        "This is an implementation of how to document your RESTful API's using SWAGGER",
      servers: ["http://localhost:5000"],
    },
    components: {
      schemas: {
        Product: {
          properties: {
            name: {
              type: "string",
            },
            price: {
              type: "string",
            },
            image: {
              type: "string",
            },
            description: {
              type: "string",
            },
            vendor: {
              type: "string",
            },
          },
        },
        User: {
          properties: {
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        Cart: {
          properties: {
            productId: {
              type: "Id",
            },
            quantity: {
              type: "number",
            },
            price: {
              type: "number",
            },
            total: {
              type: "number",
            },
          },
        },
      },
    },
  },
  apis: ["./routeHandler.js"],
};

const swaggerDocs = swaggerJsonDoc(swaggerOptions)	
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
const mongoURI =
  process.env.mongoURI ||
  "mongodb+srv://nyaks:N4aN3OuA6sy0IYP7@stock-manager-bha5c.mongodb.net/test?retryWrites=true&w=majority";

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const connect = mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected......"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.json({
    message: "Sema  kimeumana sir!",
  });
});

routes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
