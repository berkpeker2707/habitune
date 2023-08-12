"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDatabase = exports.closeDatabase = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
// This will create an new instance of "MongoMemoryServer" and automatically start it
let mongod;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    mongod = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = yield mongod.getUri();
    try {
        mongoose_1.default.set("strictQuery", false);
        yield mongoose_1.default.connect(uri);
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
    }
});
exports.connect = connect;
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // Deletes the given database, including all collections, documents, and indexes.
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    // The MongoMemoryServer can be stopped again with
    if (mongod)
        yield mongod.stop();
});
exports.closeDatabase = closeDatabase;
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    //A hash of the collections associated with this connection
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        //Deletes all of the documents that match conditions from the collection.
        yield collection.deleteMany({});
    }
});
exports.clearDatabase = clearDatabase;
