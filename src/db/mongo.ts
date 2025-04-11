import mongoose from 'mongoose';
import * as collections from './collections';

mongoose.connect('mongodb://server.jimi.berlin', {
    dbName: "website"
}).then(r => console.log("Mongoose connected"))
    .catch(e => console.log("Error connecting", e));

collections.userSchema