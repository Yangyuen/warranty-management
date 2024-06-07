import warrantyModel from '../model/warrantyModel.js'

export const addWarranty = async (req, res) => {
    try {
        const { productName, vendor, price,pr,po, expireDate } = req.body;
        const prFile = req.files['prFile'] ? req.files['prFile'][0] : null;
        const poFile = req.files['poFile'] ? req.files['poFile'][0] : null;

        if (!productName || !vendor || !price || !pr || !po || !expireDate || !prFile || !poFile) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const warranty = new warrantyModel({
            productName,
            vendor,
            price,
            pr,
            po,
            prFile: prFile.path,
            poFile: poFile.path,
            expireDate: expireDate,
        });

        await warranty.save();

        res.status(201).json(warranty);
    } catch (error) {
        console.error('Error adding warranty:', error);
        res.status(500).json({ message: 'Failed to add warranty.', error: error.message });
    }
};


// List Warranty
export const listWarranty = async (req,res)=>{
    try {
        const warranties = await warrantyModel.find();
        res.json(warranties);
      } catch (error) {
        res.status(500).send(error);
      }
};

// Update Warranty
export const updateWarranty = async (req,res) =>{
    try {
        const { productName, vendor, price,pr,po, expireDate } = req.body;
        const prFile = req.files['prFile'] ? req.files['prFile'][0] : null;
        const poFile = req.files['poFile'] ? req.files['poFile'][0] : null;

        const updatedWarranty ={
            productName,
            vendor,
            price,
            pr,
            po,
            expireDate,
        };
        if (prFile) updatedWarranty.prFile = prFile.path;
        if (poFile) updatedWarranty.poFile = poFile.path;
        
        const warranty = await warrantyModel.findByIdAndUpdate(req.params.id, updatedWarranty, { new: true});
        res.json(warranty);
        } catch (error) {
        console.error('Error updateing warranty:',error);
        res.status(500).json({message:'Fail to update warranty.', error:error.message})
    }
}

// Delete Warranty
export const deleteWarranty = async (req,res)=>{
    try {
        await warrantyModel.findByIdAndDelete(req.params.id);
        res.json({message:'Warranty deleted successfully'});
    } catch (error) {
        console.error('Error deleting warranty:', error);
        res.status(500).json({message:'Failed to delete warranty.',error:error.message})
    }
}

// Search Warranty
export const searchWarranty = async (req,res)=>{
    try {
        const query = req.query.query;
        const warranties = await warrantyModel.find({
            $or: [
                { productName: new RegExp(query,'i')},
                { vendor: new RegExp(query,'i')},
            ],
        });
        res.json(warranties);
    } catch (error) {
        console.error('Error searching warranties:',error);
        res.status(500).json({message: 'Failed to search warranties.', error: error.message})
    }
}
