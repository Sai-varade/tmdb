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
class Reviews(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(100), nullable=False)
    moviename = db.Column(db.String(100),  nullable=False)
    star = db.Column(db.Integer, nullable=False)  
    username = db.Column(db.String(50), nullable=False) 
    def to_dict(self):
        return {
            "id": self.id,
            "moviename": self.moviename,
            "review": self.review,
            "username": self.username,
            "star": self.star
        }
class User(db.Model):
    __tablename__ = 'login'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  

@app.route('/')
def home():
    return jsonify("Flask Backend")
                                                        
@app.route('/Reviews/<moviename>')  
def Revieww(moviename):
    review = Reviews.query.filter_by(moviename=moviename).all()

    return jsonify([rev.to_dict() for rev in review]) 

@app.route('/posters/<filename>')
def serve_poster(filename):
    return send_from_directory(POSTERS_FOLDER, filename)
    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.password == data['password']:
        return jsonify({"message": "Login Successfully","user":user.name})

    if data['email'] == adminId and data['password'] == adminPass:
        return jsonify({"message": "Admin"})

    return jsonify({"message": "Wrong Email or Password"})

@app.route('/SubmitReview',methods=['POST'])
def submitreview():
    data = request.get_json()
    review = Reviews.query.filter_by(username=data['username']).all()
    if review:
        return jsonify("no Review"),404

    rev = Reviews(star=data['star'],moviename=data['moviename'],username=data['username'],review = data['review'])
    db.session.add(rev)
    db.session.commit()
    return jsonify("Review Succesfully submited")

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
        movieposter=f"posters/{filename}" if filename else None,
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
            BASE_DIR = r"tmdb\Backend"
            poster_path = os.path.join(BASE_DIR, movie.movieposter.lstrip("/").replace("/", os.sep))
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
        movie.movievideo = datas['movievideo']
        movie.info = datas['info']
        movie.director = datas['director']
        movie.writer = datas['writer']
        movie.star = datas['star']

        db.session.commit()
        return jsonify({"message": "Movie updated"})

    return jsonify({"message": "Failed To Update"})

@app.route('/Users')
def Users():
    users = User.query.all()
    return jsonify([{"username":user.name, "userid" : user.id, "password": user.password,"email": user.email} for user in users]) if users else jsonify({"message":"No user"})


@app.route("/UserDelete/<int:userid>")
def delete_user(userid):
    user = User.query.get(userid)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"}), 200
    return jsonify({"error": "User not found"}), 404
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

