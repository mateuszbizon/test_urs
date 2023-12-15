import mongoose from "mongoose";


const symptomSchema = mongoose.Schema({ 
    name:{ type: String, required: true},
    description:{ type: String, required: true},
    date:{ type: Date, default: new Date()},
    creator: String,
    
})
const Symptom = mongoose.model('Symptom', symptomSchema);
export default Symptom