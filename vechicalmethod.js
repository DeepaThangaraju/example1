import { client } from "./index.js";

async function deleteVechicalbyid(id) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .deleteOne({ id: id });
}
async function editVechicalbyid(id, data) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .updateOne({ id: id }, { $set: data });
}
async function getVechicalbyid(id) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .findOne({ id: id });
}
async function postVechical(data) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .insertMany(data);
}
 async function getVechicalbyparams(filter) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .find(filter) // it is curser nothing but pagination
        .toArray();
}

export {
     getVechicalbyparams, 
     postVechical, 
     getVechicalbyid, 
     editVechicalbyid, 
     deleteVechicalbyid };
