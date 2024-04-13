const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const Medicine = require('../models/medicine');

router.post('/',jwtAuthMiddleware,async(req, res) =>{
    try{
        const data = req.body
        const newMedicine = new Medicine(data);
        const response = await newMedicine.save();
        console.log('data saved');
        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.delete('/:medicineID',jwtAuthMiddleware, async (req, res)=>{
    try{
        const medicineID = req.params.medicineID;
        const response = await Medicine.findByIdAndDelete(medicineID);
        if (!response) {
            return res.status(404).json({ error: 'medicine not found' });
        }
        console.log('medicine deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/med', jwtAuthMiddleware, async (req, res) => {
    try {
        const medicineData = req.user;
        console.log("medicine data:", medicineData);
        const medicineName = req.query.name;
        const medicine = await Medicine.find({ name: medicineName });
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        res.status(200).json({ medicine: medicine });
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;