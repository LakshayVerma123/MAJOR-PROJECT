const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));  //to parse the data from the form and make it available in req.body
app.use(methodOverride("_method")); //to override the method of the form to use PUT and DELETE
app.engine("ejs", ejsMate); //to use ejs-mate as the template engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); //to serve static files from the public folder

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// let us create a route to get all the listings from the database and render them in the index.ejs file
app.get("/listings", async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

// new route to render the form to create a new listing
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// let us create a route to get a single listing by id from the database and render it in the show.ejs file
app.get("/listings/:id", async(req, res) => {
    let {id} = req.params; 
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing});
});

//Create route to create a new listing and save it to the database
app.post("/listings", async(req, res) => {
    //const{title, description, price, country, location} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save(); //save the new listing to the database
    res.redirect("/listings"); //redirect to the listings page after saving
});

// Edit route to render the form to edit a listing
app.get("/listings/:id/edit", async(req, res) => {
    let {id} = req.params; 
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// UPDATE ROUTE to update a listing in the database
app.put("/listings/:id", async(req, res) => {
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`); //redirect to the show page of the updated listing
});

// DELETE ROUTE to delete a listing from the database
app.delete("/listings/:id", async(req, res) => {
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings"); //redirect to the listings page after deleting   
})

// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My NewVilla",
//         description: "By the beach",
//         price:1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080, () => {
    console.log("server is listening to port 8080");
})