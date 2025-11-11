const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const { request } = require("http");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req, res) => {
    try {
     let chats = await Chat.find(); //we write this without any condition to get all collections data //it is a asynchronous fxn so it returns promise and we have to await for this fxn and we write await keyword only inside async fxn so we make callack as async
    // console.log(chats);
    res.render("index.ejs", { chats });
    } catch(err) {
        next(err);
    }
    
});

//New Route
app.get("/chats/new", (req, res) => {
    // throw new ExpressError(404, "Page not found");
    res.render("new.ejs");
});

//Create Route
app.post("/chats", asyncWrap(async (req, res, next) => {
     let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    // newChat.save().then((res) => { //if we use then we dont have to also write awaut keywrd it detects that if it is thennable then kit return promise
    //     console.log("chat was saved");
    //  })
    //  .catch((err) => {
    //     console.log(err);
    //  });

    await newChat.save();
    res.redirect("/chats");
    
}));

function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}


//NEW - Show Route
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
    // throw new ExpressError(404, "Chat not found"); if we use same error handling method in async fxn too then the error will no be handled
    // as there is another to handle error in async fxn ... as in the async fxn the express did not call next() automatically so we have to do it explicitly
    next(new ExpressError(500, "Chat not found")); 
    }
    res.render("edit.ejs", { chat });
    
    
}));

//Edit Route
app.get("/chats/:id/edit", asyncWrap(async (req, res) => {
    // try { no need of writing bulky try-catch statement now so we remove it from all and use asyncWrap fxn in place of that
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
    // } catch(err) {
        // next(err);
    // }
   
}));

//Update Route
app.put("/chats/:id", asyncWrap(async (req, res) => {
    let {id} = req.params;
    let { msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg : newMsg},
        {runValidators: true, new: true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
    
})
);

//Destroy Route
app.delete("/chats/:id", asyncWrap(async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
    
}));

app.get("/", (req, res) => {
    res.send("root is working")
});

//Error Handling Middleware ---its a common error handling middleware but we have different error and with each error it have name associated with it...
//To print name of error we will create another middleware

const handleValidationErr = (err) => {
    console.log("This was a Validation error. Please follow rules");
    console.dir(err.message);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === "ValidationError") {
        err = handleValidationErr(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
   let {status = 500, message="Some Error Occured"} = err;
   res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});

//this repeated try-catch handler looks bulky so a more good way to write this try-catch we have a functionality or utility is----wrapAsync
//This wrapAsync function have fxn as arguement and it also returns another new fxn which have argument as(req, res, next)
//The another new fxn works is to execute argument fxn(wrapAsync) by passing these (req, res, next) arguments with a catch(err)