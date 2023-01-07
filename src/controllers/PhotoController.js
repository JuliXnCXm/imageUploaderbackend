const { Router } = require("express");
const Photo = require("../models/PhotoModel");
const path = require("path");


class PhotoController {


    getPhoto = async (req, res) => {
        let { id } = req.params;
        const photo = await Photo.findById({ _id: id });
        res.status(200).json(photo);
    }

    getImage = async (req, res) => {
        let {id} = req.params;
        const photo = await Photo.findById({ _id: id });
        res.sendFile(path.join(__dirname , `/../storage/imgs/${photo.photoname}`));
    }

    returnCv = async (req,res) => {
        res.sendFile(path.join(__dirname ,`/../storage/cv.js`))
    }

    addPhoto = (req, res)=>  {
        Photo.create(
            {
                photoname: req.file.filename ,
                originalname: req.file.originalname ,
                path: "storage/imgs/" + req.file.filename ,
                mimetype: req.file.mimetype,
                size: req.file.size,
                created: Date.now(),
            },
            ( error, data ) =>
            {
                if ( !error )
                {
                    data.save();
                    res.status(201).json( { message: "Photo added", data } );
                } else
                {
                    console.log( error );
                    res.status( 500 ).json( { message: "Error" } );
                }
            }
        );
    }
}

module.exports = PhotoController;