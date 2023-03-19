// ***-------------Module Importation--------------***//
// Import express module: 
const express = require("express");

// Import body-parser module: 
const bodyParser = require("body-parser");
// const { match } = require("assert");

// Import mongoose module: 
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// Import Axios module: 
const axios = require("axios");

// Import bcrypt module:
const bcrypt = require("bcrypt");

// Import multer module:
const multer = require("multer");

// import ObjectID
const { ObjectId } = require("mongodb");

// Import path module:
const path = require('path');

// Connect APP to DB (sportVenusDB):
mongoose.connect('mongodb://127.0.0.1:27017/oberlin');

// ***-------------Models Importation--------------***//

const User = require("./models/user");
const Pub = require("./models/pub");
const Request = require("./models/request");
const generateToken = require("./utils/token");



// ***-------------Express Application--------------***//
//  Create express application:
const app = express();

//  Send JSON responses:
app.use(bodyParser.json());

// get object from request:
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration of requests:
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// Folder configuration: /image SHORT CUT TO FOLDER /backend/images 
app.use('/images', express.static(path.join('backend/images')));
app.use('/cv', express.static(path.join('backend/cv')));

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',

};

const storageImageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        // Check if mimetype est autorisé isValid= valeur== true
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        let path = "backend/images";
        if (isValid) {
            error = null;
            if (MIME_TYPE[file.mimetype] == 'pdf') {
                path = "backend/cv"
            }
        }
        // if there's no erro put file in backen/images
        cb(null, path)
    },
    // Name:
    filename: (req, file, cb) => {
        // originalname ==> name from Pc
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        // Date for make sure this img is unique:
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

const storageCvConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        // Check if mimetype est autorisé isValid= valeur== true
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        // if there's no erro put file in backen/images
        cb(null, 'backend/cv')
    },
    // Name:
    filename: (req, file, cb) => {
        // originalname ==> name from Pc
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        // Date for make sure this img is unique:
        const cvName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, cvName);
    }
});

// ***-------------Business Logic--------------***//
//Business Logic : 

// SignUP:ACCOMPAGNAT
app.post("/users/signup",
    multer({ storage: storageImageConfig }).fields([{ name: 'cv', maxCount: 1 }, { name: 'img', maxCount: 1 }]), (req, res) => {
        console.log("Here into BL:Add User", req.body);
        const url = req.protocol + '://' + req.get('host');
        console.log("here url", url);
        let avatar = "";
        if (req.files.img) {
            avatar = url + '/images/' + req.files.img[0].filename;
        } else {
            avatar = url + '/images/' + "Anonymous-Avatar.jpg"
        }
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            console.log("Here pwd crypted", cryptedPwd);
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                exp: req.body.exp,
                email: req.body.email,
                role: req.body.role,
                adress: req.body.adress,
                status: req.body.status,
                tel: req.body.tel,
                pwd: cryptedPwd,
                avatar: avatar,
                cv: url + "/cv/" + req.files.cv[0].filename
            });
            console.log("here is user", user);
            user.save((err, doc) => {
                console.log("Here error", err);
                console.log("Here doc", doc);
                if (err) {
                    if (err.errors.email) {
                        res.json({ message: "Email exist", emailExist: true });
                    }
                } else {
                    res.json({ message: "User added with success" });
                }
                // if (doc) {
                //     res.json({ message: "Added with success" });

                // } else {
                //     if (err.errors.email) {
                //         res.json({ message: "Error" });
                //     }
                // }
            });
        });
    });

// SignUP:ADMIN
app.post("/users/signupAdmin",
    multer({ storage: storageImageConfig }).single('img'), (req, res) => {
        console.log("Here into BL:Add User", req.body);
        let url = req.protocol + '://' + req.get('host');
        console.log("here url", url);
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            console.log("Here pwd crypted", cryptedPwd);
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                role: req.body.role,
                adress: req.body.adress,
                tel: req.body.tel,
                pwd: cryptedPwd,
                avatar: url + "/images/" + req.file.filename,

            });
            console.log("here is user", user);
            user.save((err, doc) => {
                console.log("Here error", err);
                console.log("Here doc", doc);
                if (err) {
                    if (err.errors.email) {
                        res.json({ message: "Email exist", emailExist: true });
                    }
                } else {
                    res.json({ message: "User added with success" });
                }
                // if (doc) {
                //     res.json({ message: "Added with success" });

                // } else {
                //     if (err.errors.email) {
                //         res.json({ message: "Error" });
                //     }
                // }
            });
        });
    });

// SignUP:CLIENT
app.post("/users/signupClient",
    multer({ storage: storageImageConfig }).single('img'), (req, res) => {
        console.log("Here into BL:Add User", req.body);
        let url = req.protocol + '://' + req.get('host');
        console.log("here url", url);
        bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
            console.log("Here pwd crypted", cryptedPwd);
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                role: req.body.role,
                adress: req.body.adress,
                status: req.body.status,
                tel: req.body.tel,
                pwd: cryptedPwd,
                avatar: url + "/images/" + req.file.filename,
            });
            console.log("here is user", user);
            user.save((err, doc) => {
                console.log("Here error", err);
                console.log("Here doc", doc);
                if (err) {
                    if (err.errors.email) {
                        res.json({ message: "Email exist", emailExist: true });
                    }
                } else {
                    res.json({ message: "User added with success", user: user._id });
                }
                // if (doc) {
                //     res.json({ message: "Added with success" });

                // } else {
                //     if (err.errors.email) {
                //         res.json({ message: "Error" });
                //     }
                // }
            });
        });
    });

// LOGIN:
app.post("/users/login", (req, res) => {
    let user;
    console.log("Here into BL:lOGIN", req.body);


    User.findOne({ $or: [{ email: req.body.email }, { tel: req.body.tel }] }).then((doc) => {
        console.log("Here doc", doc);
        if (!doc) {
            res.json({ msg: "0" });
        }
        user = doc;
        console.log(req.body.pwd, doc.pwd);
        return bcrypt.compare(req.body.pwd, doc.pwd);
        // return req.body.pwd== doc.pwd;
    }).then(
        (pwdResponse) => {
            console.log("here pwdResponse", pwdResponse);
            if (!pwdResponse) {
                res.json({ msg: "1" });
            } else {
                // send user information {id, fName, lName, role}
                // let userToSend = {
                //     id: user._id,
                //     firstName: user.firstName,
                //     lasmtName: user.lastName,
                //     role: user.role,
                // };
                
                res.send({ user: user._id,token: generateToken(user._id) , msg: "2" });
            }
        }
    )

});

// Search User By ID:
app.post("/users/userId", (req, res) => {
    // let reqId = {$toObjectId: req.body.id};
    let id = req.body.id;;
    console.log("Here into BL:Search", req.body.id);
    User.findOne({
        _id: id
    })
        .then((doc) => {
            console.log("Here doc AFTER SEARCH", doc);
            if (!doc) {
                res.json({ msg: "0" });
            } else {
                // let userToSend = {
                //     firstName: doc.firstName,
                //     lastName: doc.lastName,
                //     role: doc.role,
                // };
                res.json({ user: doc, msg: "2" });
            }
        })
})

// Get All Users:
app.get("/users", (req, res) => {
    console.log("Here into BL: Get All USERS");
    // res.json({matches: matchesTab});
    User.find().then((docs) => {
        console.log("here data after search all users:", docs);
        res.json({ users: docs });
    })
});

// Confirm User:
app.put("/users/confirm", (req, res) => {
    console.log(req.body);
    User.updateOne({ _id: req.body.id }, { $set: { status: "confirmed" } }).then((doc) => {
        console.log("Here doc", doc);
        if (!doc.modifiedCount) {
            res.json({ msg: "Error" });
        } else {
            res.json({ msg: "edit successefuly" });
        }
    })

});

// Delete User:
app.put("/users/delete", (req, res) => {
    console.log(req.body);
    User.deleteOne({ _id: req.body.id }, { $set: { status: "confirmed" } }).then((doc) => {
        console.log("Here doc", doc);
        if (!doc.modifiedCount) {
            res.json({ msg: "Error" });
        } else {
            res.json({ msg: "edit successefuly" });
        }
    })
});


// Add Publication of Client
app.post("/users/pub", (req, res) => {
    console.log("here into BL:Publication", req.body);
    let pub = new Pub({
        title: req.body.title,
        status: "not confirmed",
        accompReq: "availble",
        description: req.body.description,
        clientId: ObjectId(req.body.idClient),
    });
    pub.save((err, result) => {
        console.log("Error", err);
        if (result) {
            res.status(200).json({
                msg: "Pub added with success",
            });
        }
    });
});

// Get Publications of Client::
app.post("/users/pubs", (req, res) => {
    console.log("Publication", req.body);
    let idUser = req.body.id;
    console.log(idUser);
    User.aggregate(
        [
            { $match: { "_id": ObjectId(req.body.id) } },
            {
                $lookup: {
                    from: "pubs", // collection to join
                    localField: "_id", //field from the input documents
                    foreignField: "clientId", //field from the documents of the "from" collection
                    as: "result", // output array field
                },
            },
        ],
        (error, docs) => {
            console.log(docs);
            console.log(docs[0].result);
            res.status(200).json({
                pubs: docs[0].result,
            });
        }
    );
});


// Search for Accompagnant(@, ..<exp<..):
app.post("/users/searchAcc", (req, res) => {
    console.log("Search Acc", req.body);
    User.find({
        $and: [
            {
                $or: [{ email: req.body.adress },
                { exp: { $gt: req.body.first, $lt: req.body.second } }]
            },
            { role: "accompagnant" }]
    }).then((doc) => {
        console.log("Search", doc);
        res.json({ accomps: doc });
    });
});

// GEt All Pubs:
app.get("/users/Allpubs", (req, res) => {
    console.log("Here into BL: Get All Pubs");
    // res.json({matches: matchesTab});
    Pub.find().then((docs) => {
        console.log("here data after search all Pubs:", docs);
        res.json({ pubs: docs });
    })
});


// Confirm Pub by Admiin:
app.put("/users/confirmPub", (req, res) => {
    console.log(req.body);
    Pub.updateOne({ _id: req.body.id }, { $set: { status: "confirmed" } }).then((doc) => {
        console.log("Here doc", doc);
        if (!doc.modifiedCount) {
            res.json({ msg: "Error" });
        } else {
            res.json({ msg: "edit successefuly" });
        }
    })

});

// Delete Pub By ADMIN:
app.put("/users/deletePub", (req, res) => {
    console.log(req.body);
    Pub.deleteOne({ _id: req.body.id }).then((doc) => {
        console.log("Here doc", doc);
        if (!doc.modifiedCount) {
            res.json({ msg: "Error" });
        } else {
            res.json({ msg: "edit successefuly" });
        }
    })
});

// GEt All pubs with Client DAta:
app.get(("/users/pubsClient"), (req, res)=>{
    console.log("AAAAAAAAAA");
    Pub.aggregate(
        [
            {
                 $match: { "status": "confirmed" } ,
            },
            {
                $lookup: {
                    from: "users", // collection to join
                    localField: "clientId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "client", // output array field
                },
            },
        ],
        (error, docs) => {
            console.log(docs, "AAAAAAAAAA");
            res.status(200).json({
                users: docs,
            });
        }
    );
});

// Show Client notifacation about his pub :
app.put(("/users/notification"), (req, res) =>{
    console.log("HERE NOTIFICATION",req.body);
    Pub.updateOne({_id:req.body._id}, req.body).then(
        (res)=>{
            console.log(res);
            if (res.modifiedCount == 1) {
                res.json({ msg: `User : Edited with success` });
              } else {
                res.json({ msg: `Not Edited` });
              }
        }
    )
});

// Create Request between Accomp and client
app.post(("/users/request"), (req,res)=>{

    console.log("here New Request:", req.body);
    let request = new Request({
        accompResp: req.body.accompResp,
        clientId: ObjectId(req.body.clientId),
        accompId: ObjectId(req.body.accompId),
    });
    request.save((err, result) => {
        console.log("Error", err);
        if (result) {
            res.status(200).json({
                msg: "Pub added with success",
            });
        }
    });
});

// GEt all request of one Accom == Accom dashboard
app.post("/users/getRequest", (req, res) => {
    console.log("Accom Id", req.body.id);
    // let idUser = req.body.id;
    // console.log(idUser);

    Request.aggregate(
        [
            {
                $lookup: {
                    from: "users", // collection to join
                    localField: "clientId", //field from the input documents
                    foreignField: "_id", //field from the documents of the "from" collection
                    as: "client", // output array field
                },
            },
        ],
        (error, docs) => {
            console.log("Request s Client", docs[0].client);
            if(docs){
                res.status(200).json({requests: docs});
            } else {res.status(200).json({msg: "0"}); }
        }
    );
 
    // Request.find({ accompId: req.body.id }).then((doc) => {
    //     console.log("Search Reaquest", doc);
    //     if (doc) {
    //         res.json({ requests: doc });
    //         console.log("Client Id", doc[0].clientId);
    //         User.findOne({ _id: doc[0].clientId }).then((client) => {
    //                 console.log("Here client Of request", client);
    //                 res.json({ requests: client });
    //             })            
    //     } else {
    //         res.json({ msg: "0" }); 
    //     }
    //    ;
    // });
});





// ***-------------App Exportation--------------***//
// make app importable from another files: La derniére ligne du fichier app.js
module.exports = app;