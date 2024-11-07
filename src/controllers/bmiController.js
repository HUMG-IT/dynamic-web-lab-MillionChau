// Import các hàm calculateBMI và classifyBMI từ bmi.js
const { calculateBMI, classifyBMI } = require('../models/bmi')

// Hàm getBMI xử lý yêu cầu từ client
// Trả về JSON chứa bmi và classification
// Sử dụng async để xử lí bất đồng bộ
async function getBMI(req, res, next) {
    try {
        const height = req.body.height
        const weight = req.body.weight
        
        // Kiểm tra trường hợp không nhập đủ dữ liệu
        if (!weight || !height) {
            return res.status(400).json({ error: "Vui lòng nhập đầy đủ cân nặng và chiều cao" })
        }

        // Gọi hàm tính BMI
        const bmi = calculateBMI(weight, height)
        // Gọi hàm xét loại BMI
        const classification = classifyBMI(bmi)

        // Gửi phản hồi với mã 200 cho client
        res.status(200).json({ bmi, classification })
    } catch (error) {
        next(error)
    }
}


// Xuất hàm getBMI
module.exports = getBMI
