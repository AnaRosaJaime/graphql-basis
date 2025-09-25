import mongoose from "mongoose";
import { Sequelize, DataTypes } from "sequelize";
import casual from "casual";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost/widgets");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectDB();

const widgetsSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number, 
    soldout: {
        type: String,
        enum: ["SOLDOUT", "ONSALE"],
    },
    inventory: Number,
    stores: [{ store: String }]
});

const Widgets = mongoose.model("Widgets", widgetsSchema);

const sequelize = new Sequelize("sqlite::memory:");

const CategoriesSQL = sequelize.define("categories", {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
});

async function syncAndSeedCategories() {
    try {
        await sequelize.sync({ force: true });
        console.log("Database & tables created!");

        for (let i = 0; i < 10; i++) {
            await CategoriesSQL.create({
                category: casual.word,
                description: casual.sentences(2),
            });
        }
    } catch (error) {
        throw new Error("Error syncing and seeding categories", error);
    }
};

syncAndSeedCategories();

export { Widgets };