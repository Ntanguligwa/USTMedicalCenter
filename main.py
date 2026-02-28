from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import firestore

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ustmedicalcenter.netlify.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

db = firestore.Client()

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    users_ref = db.collection("users")
    query = users_ref.where("username", "==", username).where("password", "==", password).stream()
    user = [u.to_dict() for u in query]
    if user:
        return {"success": True, "message": "Login successful"}
    return {"success": False, "message": "Invalid credentials"}
    
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ustmedicalcenter.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)