const Movie = require("../models/movie-model");
//We will perform all the CRUD Operations

//Create operation
createMovie = (req, res) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({success: false, error: "You must provide a movie" });
    }

    const movie = new Movie(body);

    if(!movie){
        return res.status(400).json({success: false, error: err});
    }

    movie.save().then(() =>{
        return res.status(201).json({
            success: true,
            id: movie._id,
            message: "Movie created succesfully!"
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,            
            message:"Something went wrong!"
        })
    })
};

// Update operation
updateMovie = async(req, res) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({
            success:false,
            error:"Oops, the body is invalid!"
        });
    }

    Movie.findOne({_id: req.params.id}, (err, movie) =>{
        if(err){
            return res.status(404).json({
                err,
                message:"We didn't find the movie you were looking for!"
            });
        }
        movie.name = body.name;
        movie.time = body.time;
        movie.rating = body.rating;

        movie.save().then(() => {
            return res.status(200).json({
                success: true,
                id: movie._id,
                message: "We've succesfully updated the movie!"
            })            
        })
        .catch(error => {
            return res.status(404).json({
                error,
                message: "The movie was not updated!"                   
            });
        })
    });
};

//Delete operation
deleteMovie = async(req,res) => {
    await Movie.findOneAndDelete({_id: req.params._id}, (err, movie) => {
        if(err){
            return res.status(400).json({
                success:false,
                error: err
            });            
        }
        if(!movie){
            return res.status(404).json({
                success: false,
                message:"We didn't find the movie you were looking for!"
            });
        }
        return res.status(200).json({success:true, data: movie})
    })
    .catch(error => { console.log(error); });
};

// Read a specific movie
getMovieById = async(req, res) => {
    await Movie.findOne({_id: req.params.id}, (err, movie) => {
        
        if(err){
            return res.status(400).json({sucess:false, error: err});
        }

        if(!movie){
            return res
                .status(404).json({
                    success:false,
                    message: "Movie not found!"
                })
        }
        return res.status(200).json({success: true, data: movie})
    })
    .catch(err => console.log(err));
};

//Read multiple movies
getMovies = async(req, res) => {
    await Movie.find({}, (err, movies) => {
        if(err){
            return res.status(400).json({success:false, error: err})
        }

        if(!movies.length){
            return res
                .status(404)            
                .json({
                    success: false,
                    error: "We didn't find the movie!"
                })
        }
        return res.status(200).json({
            success:true,
            data: movies
        })        
    })
    .catch(err => console.log(err));
};

//Exporting the modules
module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById
}