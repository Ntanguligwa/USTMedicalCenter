from fastapi import FastAPI
from pydantic import BaseModel
from google.cloud import firestore
import hashlib

app = FastAPI()
db = firestore.Client()

class LoginRequest(BaseModel):
    email: str
    password: str

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

@app.get("/")
def home():
    return {"status": "Backend is running"}

@app.post("/login")
async def login(request: LoginRequest):
    user_doc = db.collection("users").document(request.email).get()

    if not user_doc.exists:
        return {"success": False, "message": "User not found"}

    user_data = user_doc.to_dict()

    if user_data["password_hash"] == hash_password(request.password):
        return {"success": True}
    else:
        return {"success": False, "message": "Incorrect password"}

from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    # For now, we just print credentials to test the connection
    print(f"Username: {username}, Password: {password}")
    # Temporary response
    return JSONResponse({"success": True, "message": "Received login data"})