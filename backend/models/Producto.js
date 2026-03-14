const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  oferta: {
    type: Boolean,
    default: false
  },
  descripcion: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Producto", ProductoSchema);