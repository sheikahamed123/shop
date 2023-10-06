import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
export const createCategoryController=async (req,res)=>{
try{
  const {name}=req.body
  if(!name){
    return res.status(401).send({
        message:"Name is Required"
    })
}
    const existingCategory=await categoryModel.findOne({name})

    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"Category Already Exists"
        })
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
        success:true,
        message:"New Category Created",
        category
    })
  
}
catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in Category"
    })
}
}

//update category

export const updateCategoryController=async(req,res)=>{
   
    try{
        const {name}=req.body
        const {id}=req.params
   const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
   res.status(200).send({
    success:true,
    message:"Category Updated SuccessFully",
    category
   })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error While Updating Category"
        })
        
    }

}
//get all categories

export const categoryController=async(req,res)=>{
try{
    const category=await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:"All Categories",
        category
    })
}
catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error While Getting All Categories",
        error
    })
}

}

//single category

export const singleCategoryController= async(req,res)=>{
try{
  
  const category=await categoryModel.findOne({slug:req.params.slug})
  res.status(200).send({
    success:true,
    message:"Single Category",
    category
})

}
catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error While Getting Single Category",
        error
    })
}

}

//delete category

export const deleteCategoryController=async(req,res)=>{
 try{
    const {id}=req.params
   await categoryModel.findByIdAndDelete(id)
   res.status(200).send({
    success:true,
    message:"Category Deleted"
   })
 }
 catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error While Deleting Category",
        error
    })
}

}
