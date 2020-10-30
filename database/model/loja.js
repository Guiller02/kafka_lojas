const mongoose = require("../mongo");

const LojaSchema = mongoose.Schema({
    
    IdLoja: {
        type: Number,
        required: true
    },
    NmLoja: {
        type: String,
        required: true
    },
    DsEndereco: {
        type: String,
        required: true
    },
    DsCidade: {
        type: String,
        required: true
    },
    DsUf: {
        type: String,
        required: true
    },
    FlFechado: {
        type: Boolean,
        required: true
    },
});
module.exports = mongoose.model("Lojas", LojaSchema);