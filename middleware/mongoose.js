import mongoose from 'mongoose'

const connectDb = (handler) => async (req, res) => {
    if (mongoose.connection.readyState) {
        return handler(req, res);
    }
    try {
         mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error connecting to database");
    }
    return handler(req, res);
};

export default connectDb;
