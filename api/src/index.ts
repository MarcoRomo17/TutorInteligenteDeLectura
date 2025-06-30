import app from "./app";
import mongoose from "mongoose";

async function main(){
    try {
        await mongoose.connect(
            "mongodb+srv://marco200577:mazinger17Dante@ayvoy.011v3.mongodb.net/TutorInteligente"
        );
        console.log('BD corriendo con exito');
        app.listen(4010, ()=>{
            console.log("Aplicacion corriendo con exito")
        })
    } catch (error) {
        console.log("Algo salio mal con la base de datos")
    }


}
main();
