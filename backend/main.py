
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
import pandas as pd 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Energy Optimizer API is running"}

@app.get("/stats")
def stats():
    df = pd.read_csv("data/usage.csv")
    return {
    "average_usage": round(df["usage_kwh"].mean(), 2),
    "max_usage": int(df["usage_kwh"].max()),
    "total_usage": int(df["usage_kwh"].sum()),
    "daily_usage": df.to_dict(orient="records")
}