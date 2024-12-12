import mongoose from "mongoose";

const Docs = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    documents: {
        type: Array,
        required: true,
    }
});

export default mongoose.model("Docs", Docs);