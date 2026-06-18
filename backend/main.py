from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def analyze_dataframe(df):
    average = round(df["usage_kwh"].mean(), 2)
    max_usage = int(df["usage_kwh"].max())
    total = int(df["usage_kwh"].sum())
    highest_day = df.loc[df["usage_kwh"].idxmax()]["date"]

    ai_tip = (
        f"Your highest usage was {max_usage} kWh on {highest_day}. "
        "Try shifting heavy usage like laundry, heating, or EV charging "
        "to lower-demand hours to reduce peak energy use."
    )

    return {
        "average_usage": average,
        "max_usage": max_usage,
        "total_usage": total,
        "highest_day": highest_day,
        "ai_tip": ai_tip,
        "daily_usage": df.to_dict(orient="records"),
    }

@app.get("/")
def root():
    return {"message": "VoltWise API is running"}

@app.get("/stats")
def stats():
    df = pd.read_csv("data/usage.csv")
    return analyze_dataframe(df)

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    if "date" not in df.columns or "usage_kwh" not in df.columns:
        return {"error": "CSV must contain date and usage_kwh columns"}

    return analyze_dataframe(df)