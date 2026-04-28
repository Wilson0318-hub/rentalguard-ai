from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.analyze_router import router as analyze_router

app = FastAPI(title="RentalGuard AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router, prefix="/api")

@app.get("/")
def health_check():
    return {
        "message": "RentalGuard AI Backend is running"
    }