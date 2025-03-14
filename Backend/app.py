from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask_cors import CORS  
from dotenv import load_dotenv  
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

password = os.getenv("DATABASE_PASSWORD")
adminId = os.getenv("ADMIN_ID")
adminPass = os.getenv("ADMIN_PASS")

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{password}@localhost/TmdbData"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = os.path.join(os.getcwd(), "Tmdb/Backend")
POSTERS_FOLDER = os.path.join(UPLOAD_FOLDER, "posters")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

db = SQLAlchemy(app)


class Movies(db.Model):
    __tablename__ = 'movieslist'
    id = db.Column(db.Integer, primary_key=True)
    moviename = db.Column(db.String(100),unique = True, nullable=False)
    movieposter = db.Column(db.String(100), nullable=False)
    movievideo = db.Column(db.String(200), nullable=False)
    info = db.Column(db.String(500), nullable=False)
    director = db.Column(db.String(200), nullable=False)
    writer = db.Column(db.String(200), nullable=False)
    star = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "moviename": self.moviename,
            "movieposter": self.movieposter,
            "movievideo": self.movievideo,
            "info": self.info,
            "director": self.director,
            "writer": self.writer,
            "star": self.star
        }


class User(db.Model):
    __tablename__ = 'login'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Store hashed passwords


@app.route('/')
def home():
    return "Flask Backend"


@app.route('/uploads/posters/<filename>')
def serve_poster(filename):
    return send_from_directory(POSTERS_FOLDER, filename)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.password == data['password']:
        return jsonify({"message": "Login Successfully"})

    if data['email'] == adminId and data['password'] == adminPass:
        return jsonify({"message": "Admin"})

    return jsonify({"message": "Wrong Email or Password"})


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    userName = data['name']
    Email = data['email']
    Password = data['password']
    if not userName or not Email or not Password:
        return jsonify({"message" : "Fill All Field"}) ,400
    newUser = User(name=userName, email=Email, password=Password)
    db.session.add(newUser)
    db.session.commit()

    return jsonify({"message": "Register Successfully"})


@app.route('/add_movie', methods=['POST'])
def moviesdata():
    Moviename = request.form.get("moviename")
    Movievideo = request.form.get("movievideo")
    Info = request.form.get("info")
    Director = request.form.get("director")
    Writer = request.form.get("writer")
    Star = request.form.get("star")
    poster_file = request.files.get("movieposter")
    filename = None
    filename = secure_filename(f"{Moviename}.{poster_file.filename.split('.')[-1]}")
    poster_path = os.path.join(app.config["UPLOAD_FOLDER"], "posters", filename)
    poster_file.save(poster_path)

    if Movies.query.filter_by(moviename=Moviename).first():
        return jsonify({"Message": "Movie Exists"})

    data = Movies(
        moviename=Moviename,
        movieposter=f"/uploads/posters/{filename}" if filename else None,
        movievideo=Movievideo,
        info=Info,
        director=Director,
        writer=Writer,
        star=Star
    )
    db.session.add(data)
    db.session.commit()

    return jsonify({"Message": "Movie Added Successfully!"})


@app.route('/all_movies', methods=['GET'])
def allMovies():
    allMovie = Movies.query.all()
    return jsonify([movie.to_dict() for movie in allMovie]) if allMovie else jsonify({"Message": "No movies available"})


@app.route('/delete_movie/<id>')
def deleteMovie(id):
    movie = Movies.query.get(id)
    if movie:
        if movie.movieposter:
            poster_path = os.path.join(os.getcwd(), movie.movieposter.lstrip("/"))
            if os.path.exists(poster_path): 
                os.remove(poster_path)

        db.session.delete(movie)
        db.session.commit()

        return jsonify({"message": "Movie deleted"})

    return jsonify({"message": "Movie not available"})


@app.route('/detail_movie/<id>')
def DetailMovie(id):
    movie = Movies.query.get(id)
    return jsonify(movie.to_dict()) 


@app.route('/update_movie/<id>', methods=['POST'])
def updateMovie(id):
    movie = db.session.get(Movies, id)

    if movie:
        datas = request.get_json()

        movie.moviename = datas['moviename']
        movie.movieposter = datas['movieposter']
        movie.movievideo = datas['movievideo']
        movie.info = datas['info']
        movie.director = datas['director']
        movie.writer = datas['writer']
        movie.star = datas['star']

        db.session.commit()
        return jsonify({"message": "Movie updated"})

    return jsonify({"message": "Failed To Update"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

