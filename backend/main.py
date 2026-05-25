# from fastapi import FastAPI
# from pydantic import BaseModel
# app = FastAPI()
# class User(BaseModel):
#     name: str
#     email: str
#     password: str

# @app.get("/")
# def home():
#     return {"message": "Backend Working"}

# @app.post("/register")
# def register(user: User):
#     print(user)

#     return{
#          "message": "User Registered Successfully",
#         "data": user
#     }



from fastapi import FastAPI
from models import User, LoginUser
from database import conn, cursor
from fastapi.middleware.cors import CORSMiddleware
import bcrypt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Working"}

# REGISTER API
@app.post("/register")
def register(user: User):

    # Convert password into bytes
    password_bytes = user.password.encode('utf-8')

    # Hash password
    hashed_password = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    # Store hashed password
    cursor.execute(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        (
            user.name,
            user.email,
            hashed_password.decode('utf-8')
        )
    )

    conn.commit()

    return {
        "message": "User Registered Successfully"
    }

# LOGIN API
@app.post("/login")
def login(user: LoginUser):

    # Find user only by email
    cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (user.email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:

        stored_password = existing_user[3]

        # Compare entered password with hashed password
        password_match = bcrypt.checkpw(
            user.password.encode('utf-8'),
            stored_password.encode('utf-8')
        )

        if password_match:

            return {
                "message": "Login Successful"
            }

    return {
        "message": "Invalid Email or Password"
    }

# GET USERS API
@app.get("/users")
def get_users():

    cursor.execute("SELECT * FROM users")

    users = cursor.fetchall()

    return {
        "users": users
    }