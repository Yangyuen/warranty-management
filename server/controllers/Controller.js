import warrantyModel from '../model/warrantyModel.js'
import fs from 'fs';
import xlsx from 'xlsx';


const excelDateToJSDate = (excelDate) => {
    const jsDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    return jsDate;
};


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

// Import Data
export const importWarranty = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        for (const item of data) {
            const { productName, vendor, price, pr, po, expireDate } = item;
            if (!productName || !vendor || !price || !pr || !po || !expireDate) {
                console.error('Missing required fields in:', item);
                continue;
            }
            const warranty = new warrantyModel({
                productName,
                vendor,
                price,
                pr,
                po,
                prFile: '',
                poFile: '',
                expireDate: excelDateToJSDate(expireDate),
            });
            await warranty.save();
        }

        fs.unlinkSync(filePath); // ลบไฟล์หลังจากนำเข้าข้อมูลเสร็จสิ้น
        res.status(201).json({ message: 'Warranties imported successfully!' });
    } catch (error) {
        console.error('Error importing warranties:', error);
        res.status(500).json({ message: 'Failed to import warranties.', error: error.message });
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
export const searchWarranty = async (req, res) => {
    try {
        let warranties;
        const query = req.query.query;

        if (!query) {
            // ถ้าคำค้นหาเป็นค่าว่าง ให้แสดงข้อมูลทั้งหมด
            warranties = await warrantyModel.find();
        } else {
            // ค้นหาข้อมูลในฐานข้อมูลตามคำค้นหาที่กำหนด
            warranties = await warrantyModel.find({
                $or: [
                    { productName: new RegExp(query, 'i') },
                    { vendor: new RegExp(query, 'i') },
                ],
            });
        }

        res.json(warranties);
    } catch (error) {
        console.error('Error searching warranties:', error);
        res.status(500).json({ message: 'Failed to search warranties.', error: error.message });
    }
}
