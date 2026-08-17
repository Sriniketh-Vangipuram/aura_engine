const {z} = require("zod");

const productSchema=z
    .object({
        productName:z
        .string()
        .trim()
        .min(2,"Product name must be atleast 2 characters")
        .max(150,"Product name cannot exceed 150 characters"),

        sku:z
        .string()
        .trim()
        .min(1,"SKU is required"),

        category:z
        .string()
        .trim()
        .min(1,"Category is required"),

        price:z
        .number({
            error:"Price must be a number",
        })
        .nonnegative("Cost cannot be negative"),

        cost:z
        .number({
            error:"Cost must be a number",
        })
        .nonnegative("Cost cannot be negative"),

        stockQuantity:z
        .number({
            error:"Stock quantity must be a number",
        })
        .nonnegative("Stock quantity cannot be negative"),

        reorderLevel:z
            .number({
                error:"Reorder level must be a number",
            })


            .nonnegative("Reorder level cannot be negative"),

        lastUpdated:z.coerce.date().optional(),
    })

    .refine(
        (data)=>data.price >= data.cost,
        {
            message:"Price cannot be lower than cost",
            path:["price"],
        }
    );


module.exports={
    productSchema,
};