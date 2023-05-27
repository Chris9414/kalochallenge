const PostsServices = require("../services/posts.services");

const createPost = async (req,res,next) => {
    try {
        const newPost = req.body;
        const result = await PostsServices.create(newPost)
        res.status(201).json({
            status: "success",
            message: "The Post has been created",
            result
            })
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req,res,next) => {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        await PostsServices.update({title,description}, id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

const uploadImagePublication = async (req, res, next) => {
  
    const publicationID = req.params.id;
    const files = req.files;
    try {
      if (files.length < 1) throw new CustomError('No images received', 400, 'Bad Request');
  
      let imagesKeys = [];
      let imagesErrors = [];
  
      let openSpots = await publicationImagesService.getAvailableImageOrders(publicationID)
  
      await Promise.all(
  
        openSpots.map(async (spot, index) => {
          try {
            
            if (!files[index]) return
  
            let fileKey = `public/publications/images/image-${publicationID}-${spot}`;
    
            if (files[index].mimetype == 'image/png') {
              fileKey = `public/publications/images/image-${publicationID}-${spot}.png`;
            }
    
            if (files[index].mimetype == 'image/jpg') {
              fileKey = `public/publications/images/image-${publicationID}-${spot}.jpg`;
            }
    
            if (files[index].mimetype == 'image/jpeg') {
              fileKey = `public/publications/images/image-${publicationID}-${spot}.jpeg`;
            }
    
            await uploadFile(files[index], fileKey);
    
            let bucketURL = process.env.AWS_DOMAIN + fileKey;
    
            let newImagePublication = await publicationImagesService.createImage(
              publicationID,
              bucketURL,
              spot
            );
  
            imagesKeys.push(bucketURL)
  
          } catch (error) {
            imagesErrors.push(error.message)
          }
        })
      );
  
      await Promise.all(
        files.map(async (file) => {
          try {
            await unlinkFile(file.path);
          } catch (error) {
            //
          }
        })
      );
  
      return response
        .status(200)
        .json({ results: { message: `Count of uploaded images: ${imagesKeys.length} `, imagesUploaded: imagesKeys , imageErrors: imagesErrors} });
  
    } catch (error) {
      if (files) {
        await Promise.all(
          files.map(async (file) => {
            try {
              await unlinkFile(file.path);
            } catch (error) {
              //
            }
          })
        );
      }
      return next(error);
    }
  };
  
  const removePublicationImage = async (req, res, next) => {
    const publicationID = req.params.id
    const order = req.params.order
    try {
  
      let {image_url} = await publicationImagesService.getImageOr404(publicationID, order)
      let awsDomain = process.env.AWS_DOMAIN
      const imageKey = image_url.replace(awsDomain, '')
      await deleteFile(imageKey)
      let publicationImage = await publicationImagesService.removeImage(publicationID, order)
  
      return res.status(200).json({ message: 'Removed', image: publicationImage })
    } catch (error) {
      next(error)
    }
  }

module.exports = {
    createPost,
    updatePost,
    uploadImagePublication,
    removePublicationImage,

}