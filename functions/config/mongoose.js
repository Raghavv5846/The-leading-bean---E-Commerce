const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    console.log("mongoose has connected");
  await mongoose.connect(`mongodb+srv://raghavpareek5846:Raghav5846@tlb.7lfempd.mongodb.net/?retryWrites=true&w=majority`);
}