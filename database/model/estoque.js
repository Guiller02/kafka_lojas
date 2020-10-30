const mongoose = require("../mongo");

const EstoqueSchema = mongoose.Schema({
    
    IdLoja: {
        type: Number,
        required: true
    },
    IdProduto: {
        type: Number,
        required: true
    },
    TpMovimento: {
        type: String,
        required: true
    },
    QdMovimento: {
        type: Number,
        required: true
    },
    TsMovimento: {
        type: Date,
        required: true
    },
});
module.exports = mongoose.model("MovimentoEstoque", EstoqueSchema);