const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    ServingQty: {
        type: Number
    },
    PrepTimeInMin: {
        type: Number
    },
    Ingredients: {
        bsonType: ["array"],
        items: {
            bsonType: ["object"],
            required: ["quantity", "measure", "ingredient"],
            additionalProperties: false,
            properties: {
                quantity: {
                    bsonType: ["int", "double", "decimal"],
                    description: "'quantity' is required and is of double or decimal type"
                },
                measure: {
                    enum: ["tsp", "Tbsp", "cup", "litre", "kg", "each", "pinch"],
                    description: "'Measure' is required and can only be one of the given enum values"
                },
                ingredient: {
                    bsonType: "string",
                    description: "'ingredient' is required and is a string"
                },
                format: {
                    bsonType: "string",
                    description: "'format' is an optional field of type string, e.g. chopped or diced"
                }
            }
        }
    },
    Directions: {
        type: [String]
    },
    Notes: {
        type: String
    }
});