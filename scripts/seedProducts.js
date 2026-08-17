require("dotenv").config();

const {faker}=require("@faker-js/faker");

const connectDatabase=require("../src/config/database");
const Product=require("../src/models/Product");

const TOTAL_PRODUCTS=50_000;
const BATCH_SIZE=1_000;

const CATEGORIES=[
    "electronics",
    "furniture",
    "clothing",
    "sports",
    "home-appliances",
    "automotive",
    "office-supplies",
    "groceries",
];

const generateProduct=(index)=>{
    const cost=Number(faker.commerce.price({min:5,max:2000}));

    const price=Number(
        faker.commerce.price({
            min:cost,
            max:cost*1.5,
        })
    );

    return {
        productName:faker.commerce.productName(),
        sku:`AURA-${String(index+1).padStart(6,"0")}`,
        category:faker.helpers.arrayElement(CATEGORIES),
        price,
        cost,
        stockQuantity:faker.number.int({min:0,max:1000}),
        reorderLevel:faker.number.int({min:10,max:100}),
        lastUpdated:faker.date.recent({days:30}),
    };
};

const seedProducts=async()=>{
    try{
        await connectDatabase();

        console.log(`Starting seed of ${TOTAL_PRODUCTS} products...`);

        await Product.deleteMany();

        console.log("Existing products cleared.");

        for(let start=0;start<TOTAL_PRODUCTS;start+=BATCH_SIZE){
            const end=Math.min(start + BATCH_SIZE, TOTAL_PRODUCTS);

            const products=[];

            for(let index=start;index<end;index++){
                products.push(generateProduct(index));
            }

            await Product.insertMany(products,{
                ordered:false,
            });

            console.log(`Inserted ${end}/${TOTAL_PRODUCTS} products`);
        }

        console.log("Product seeding completed successfully.");

        process.exit(0);
    }

    catch(error){
        console.error("Product seeding failed:",error);

        process.exit(1);
    }
};


seedProducts();