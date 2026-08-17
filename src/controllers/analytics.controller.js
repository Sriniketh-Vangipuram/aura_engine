const analyticsService=require("../services/analytics.service");

const getInventoryAnalytics=async(req,res,next)=>{
    try{

        const category=req.query.category?.trim();

        const analytics=await analyticsService.getInventoryAnalytics({
            category,
        });

        res.status(200).json({
            success:true,
            data:analytics,
        });
    }
    catch(error){
        next(error);
    }
}

module.exports={
    getInventoryAnalytics,
};