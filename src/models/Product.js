const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
    {
        productName:{
            type:String,
            required:[true,"Product name is required"],
            trim:true,
            minlength:[2,"Product name must be at least 2 characters"],
            maxlength:[150,"Product name cannot exceed 150 characters"],
        },

        sku:{
            type:String,
            required:[true,"SKU is required"],
            trim:true,
            uppercase:true,
        },

        category:{
            type:String,
            required:[true,"Category is required"],
            trim:true,
            lowercase:true,
        },

        price:{
            type:Number,
            required:[true,"Price is required"],
            min:[0,"Price cannot be negative"],
        },

        cost:{
            type:Number,
            required:[true,"Cost is required"],
            min:[0,"Cost cannot be negative"],
        },

        stockQuantity:{
            type:Number,
            required:[true,"Stock quantity is required"],
            min:[0,"Stock quantity cannot be negative"],
        },

        reorderLevel:{
            type:Number,
            required:[true,"Reorder level is required"],
            min:[0,"Reorder level cannot be negative"],
        },

        lastUpdated:{
            type:Date,
            default:Date.now,
        },
    },
    {
        timestamps:true,
    }
);

productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ productName: 1 });

module.exports=mongoose.model("Product",productSchema);

