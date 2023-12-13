const HouseOrder=require('../Models/HouseOrder');
module.exports={
    ContactSeller:async(req,res,next)=>{
        try {
            const{UserId,userName,PhoneNumber}=req.body;
            if(!UserId||!userName||!PhoneNumber){
                return res.send({
                    message:"one of your fields are empty",
                    severity:"success"
                }) 
            }
            await HouseOrder.create({
                UserId:UserId,
                userName:userName,
                PhoneNumber:PhoneNumber, 
            })
            return res.send({
                message:"You have contacted the seller he will contact you shortly",
                severity:"success"
            })
        } catch (error) {
            console.log(error);
        }
    }
}