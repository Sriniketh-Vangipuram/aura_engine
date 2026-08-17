const inventoryService=require("../services/inventory.service");

const getInventory=async (req,res,next)=>{

    try{
        const page=Number(req.query.page) || 1;
        const limit=Number(req.query.limit) || 50;

        if(!Number.isInteger(page) || page<1){
          return res.status(400).json({
            success:false,
            message:"Page must be a positive integer",
          });
        }

        if(!Number.isInteger(limit) || limit <1 || limit >100){
          return res.status(400).json({
            success:false,
            message:"Limit must be between 1 and 100",
          })
        }

        const search=req.query.search?.trim();
        const category=req.query.category?.trim();

        const sort=req.query.sort?.trim();

        const result=await inventoryService.getInventory({
            page,
            limit,
            search,
            category,
            sort,
        });


        res.status(200).json({
            success:true,
            data:result.products,
            pagination:result.pagination,
        });
    }

    catch(error){
        next(error);
    }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await inventoryService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await inventoryService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports={
    getInventory,
    createProduct,
    updateProduct,
}