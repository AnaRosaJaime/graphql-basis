import { Widgets } from "./dbConnectors";



const resolvers = {
    getProduct: async ({ id }) => {
        try {
            const product = await Widgets.findById(id);
            return product;
        } catch (error) {
            throw new Error("Product not found", error);
        }
    },
    getAllProducts: async () => {
        try {
            const products = await Widgets.find({});
            return products;
        } catch (error) {
            throw new Error("Error fetching products", error);
        }
    },
    createProduct: async ({ input }) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores
        });

        newWidget.id = newWidget._id;
        
        try {
            const savedWidget = await newWidget.save();
            return savedWidget;
        } catch (error) {
            throw new Error("Error creating product", error);
        }
    },
    updateProduct: async ({ id, input }) => {
        try {
            const updatedWidget = await Widgets.findByIdAndUpdate(
                id,
                {
                    name: input.name,
                    description: input.description,
                    price: input.price,
                    soldout: input.soldout,
                    inventory: input.inventory,
                    stores: input.stores
                },
                { new: true }
            );
            return updatedWidget;
        } catch (error) {
            throw new Error("Error updating product", error);
        }
    },
    deleteProduct: async ({ id }) => {
        try {
            await Widgets.deleteOne({_id: id});
            return "Successfully deleted product";
        } catch (error) {
            throw new Error("Error deleting product", error);
        }
    }
}

export default resolvers;