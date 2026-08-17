const Product=require("../models/Product");

const ALLOWED_SORT_FIELDS=new Set([
    "productName",
    "price",
    "cost",
    "stockQuantity",
    "reorderLevel",
    "lastUpdated",
]);

const buildSort=(sort)=>{
    if(!sort){
        return {lastUpdated:-1};
    }

    const isDescending=sort.startsWith("-");
    const field=isDescending?sort.slice(1):sort;

    if(!ALLOWED_SORT_FIELDS.has(field)){
        return {lastUpdated:-1};
    }

    return {
        [field]:isDescending?-1:1,
    }
}

const getInventory=async({page,limit,search,category,sort})=>{

    const skip=(page-1) * limit;

    const query={};

    if(search){
        query.productName={
            $regex:search,
            $options:"i",
        };
    }

    if(category){
        query.category=category.toLowerCase();
    }

    const sortOption=buildSort(sort);

    const[products,totalRecords]=await Promise.all([
        Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean(),

        Product.countDocuments(query),
    ]);

    const totalPages=Math.ceil(totalRecords/limit);

    return {
        products,
        pagination:{
            totalRecords,
            totalPages,
            currentPage:page,
            hasNextPage:page<totalPages,
        }
    };
};
    const createProduct = async (productData) => {
        return Product.create(productData);
    };

    const updateProduct = async (productId, productData) => {
        return Product.findByIdAndUpdate(
            productId,
            productData,
            {
                new: true,
                runValidators: true,
            }
        );
    };

module.exports={
    getInventory,
    createProduct,
    updateProduct,
}