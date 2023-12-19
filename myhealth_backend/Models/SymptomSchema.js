import mongoose from "mongoose";


const symptomSchema = mongoose.Schema({ 
    name:{ type: String, required: true},
    description:{ type: String, required: true},
    date:{ type: String, required: true},
    creator: String,
    
})
const Symptom = mongoose.model('Symptom', symptomSchema);
export default Symptom