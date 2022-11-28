from flask import Flask, redirect, render_template, url_for,request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////Users/zikangying/Desktop/CS1520/labs/flask app/flask_introduction/blog.db'
db = SQLAlchemy(app)

app.app_context().push()

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(200), nullable = False)
    author = db.Column(db.String(200), nullable = False)
    content = db.Column(db.String(200), nullable = False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Blog %t>' % self.id

#db.create_all()

@app.route("/", methods=['POST','GET'])
def index():
    blogsData = Blog.query.order_by(Blog.date_created).all()
    return render_template("index.html", blogs=blogsData)

@app.route("/new-blog", methods=['POST','GET'])
def newBlog():
    if request.method == "POST":
        blogTitle = request.form['blogTitle']
        blogAuthor = request.form['blogAuthor']
        blogContent = request.form['blogContent']
        newBlog = Blog(title=blogTitle, author=blogAuthor, content=blogContent)
        try:
            db.session.add(newBlog)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your task'
    else:
        return render_template("new-blog.html")

@app.route("/blog/<int:id>", methods=['POST','GET'])
def displayBlog(id):
    requestedBlog = Blog.query.get_or_404(id)
    return render_template("blog.html", blog = requestedBlog)

@app.route("/delete/<int:id>", methods=['POST','GET'])
def delete(id):
    blogToBeDelete = Blog.query.get_or_404(id)
    try:
        db.session.delete(blogToBeDelete)
        db.session.commit()
        # redirect to the main page
        return redirect("/")
    except:
        return "There was a problem deteling that task"

if __name__=="__main__":
    app.run(debug=True)
    
