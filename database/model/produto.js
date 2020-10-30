const mongoose = require("../mongo");

const ProdutoSchema = mongoose.Schema({
    id_produto: {
        type: Number,
        required: true
    },
    dsProduto: {
        type: String,
        required: true
    },
    txProduto: {
        type: String,
        required: true
    },
    vlProduto: {
        type: Number,
        required: true
    },
    flBloqueado: {
        type: Boolean,
        required: true
    },
    QdEstoque: {
        type: Number,
        required: true
    },
});
module.exports = mongoose.model("Produto", ProdutoSchema);