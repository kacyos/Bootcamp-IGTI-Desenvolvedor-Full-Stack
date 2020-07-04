import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    agencia:{
        type: Number,
        required: true,
    },
    conta:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    balance:{
        type: Number,
        required: true,
        validate(value){
            if (value < 0) {
                throw new Error(
                    "Valor abaixo de zero não é permitido."
                );
            };
        }
    }
});

const usersModel = mongoose.model("users", userSchema);

export {usersModel};