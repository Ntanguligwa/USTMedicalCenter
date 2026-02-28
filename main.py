# main.py
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import firestore

# Initialize FastAPI app
app = FastAPI()

# Enable CORS so your Netlify frontend can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ustmedicalcenter.netlify.app"],  # Your Netlify frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Firestore
db = firestore.Client()  # Make sure credentials are set

# Login endpoint
@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    """
    Check Firestore for a user matching the username and password.
    """
    users_ref = db.collection("users")
    query = users_ref.where("username", "==", username).where("password", "==", password).stream()
    
    user = [u.to_dict() for u in query]
    
    if user:
        return {"success": True, "message": "Login successful"}
    
    return {"success": False, "message": "Invalid credentials"}
