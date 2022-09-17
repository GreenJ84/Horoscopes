from flask import redirect, render_template, request, session, flash
from flask_app import app
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
from flask_app.models.user import User
from flask_cors import CORS

#================= Render Main Page ==================
@app.route('/')
def visitor_display():

    if 'user_id' in session:
        return redirect('/dashboard')

    return render_template('main_page.html')



#================= Render Register Page ==================

@app.route('/register')
def register():

    if 'user_id' in session:
        return redirect('/dashboard')
    
    return render_template('register.html')


#================= Render Login Page ==================

@app.route('/login')
def login():

    if 'user_id' in session:
        return redirect('/dashboard')
    
    return render_template('login.html')



#=========================== Register user and redirect to user page ====================

@app.route('/register_user', methods=['POST'])
def register_user():
    print(request.form)
    # if not User.validate_register(request.form):
    #     return redirect('/register')

    # data_check ={
    #     'email': request.form['email']
    # }
    # user = User.get_by_email(data_check)
    # if user:
    #     flash('Email already registered! Please log in!', 'login')
    #     return redirect('/login')

    # password_hash = bcrypt.generate_password_hash(request.form['password'])

    # data = {
    #     'first_name': request.form['first_name'],
    #     'last_name': request.form['last_name'],
    #     'email': request.form['email'],
    #     'password': password_hash
    # }
    # user_id = User.create_user(data)

    # session['user_id'] = user_id
    # session['user_first_name']= request.form['first_name']

    return redirect('/dashboard')



#============================ Log In user and redirect to user page ==========================
@app.route('/login_user', methods=['POST'])
def login_user():

    data = { 
        "email" : request.form["email"] 
        }
    user = User.get_by_email(data)

    if not user:
        session.clear()
        flash("User is not Registered, Please register.", "register")
        return redirect("/register")

    user_registered = user[0]

    if not bcrypt.check_password_hash(user_registered['password'], request.form['password']):
        flash("Invalid Email/Password", "login")
        return redirect('/')

    session['user_id'] = user_registered['id']
    session['user_first_name'] = user_registered['first_name']

    return redirect('/dashboard')




#===========================Render user page ====================
@app.route('/dashboard')
def display_user():
    if 'user_id' not in session:
        flash("If you want personalized info please register/login!")
        return redirect('/')
    
    data= {
        'user_id': session['user_id']
        }
    user_info = User.get_user_info(data)

    return render_template('user_page.html', user_info = user_info, display_name = session['user_first_name'])

#=========================== Log User Out/ Clear session ====================
@app.route('/logout')
def logout():
    
    session.clear()

    return redirect ('/')
