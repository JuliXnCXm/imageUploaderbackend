const {Router} = require('express');
const PhotoController = require("../controllers/PhotoController");

class PhotoRouter {
    constructor() {
        this.router = new Router();
        this.#config();
    }

    #config() {
        const objPhotoC =  new PhotoController();
        this.router.get('/user/photo/upload/:id', objPhotoC.getPhoto);
        this.router.get('/user/photo/image/:id', objPhotoC.getImage);
        this.router.get('/returnCv', objPhotoC.returnCv)
        this.router.post("/user/photo",objPhotoC.addPhoto )
    }
}

module.exports = PhotoRouter;