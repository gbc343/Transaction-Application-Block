const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    gasUsed:{
        type:String
    },
    receiptHash:{
        type: String
    }

}, { timestamps: true })

const Trasaction = mongoose.model('Transaction', transactionSchema);
 module.exports = Trasaction;

