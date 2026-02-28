from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import firestore

app = FastAPI()

# Enable CORS so Netlify frontend can call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ustmedicalcenter.netlify.app"],  # restrict to your site
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firestore client
db = firestore.Client()

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    users_ref = db.collection("users")
    query = users_ref.where("username", "==", username).where("password", "==", password).stream()
    user = [u.to_dict() for u in query]
    if user:
        return {"success": True, "message": "Login successful"}
    return {"success": False, "message": "Invalid credentials"}
