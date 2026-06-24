from db import get_connection
from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File, Form 
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from ai import ask_voltwise, generate_ai_insights, generate_savings_report
import psycopg2
from psycopg2 import sql





class ChatRequest(BaseModel):
    question: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5178",
        "http://localhost:5188",
    ],
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

    peak_ratio = max_usage / average if average > 0 else 1

    if peak_ratio < 1.2:
        energy_score = 95
        energy_label = "Excellent"
    elif peak_ratio < 1.4:
        energy_score = 85
        energy_label = "Good"
    elif peak_ratio < 1.7:
        energy_score = 70
        energy_label = "Fair"
    else:
        energy_score = 55
        energy_label = "Needs attention"

    forecast_usage = round(average * 30, 2)
    price_per_kwh = 20
    forecast_bill = int(forecast_usage * price_per_kwh)
    forecast_confidence = 82

    forecast_explanation = (
        f"Based on your average daily usage of {average} kWh, "
        f"VoltWise estimates next month's usage at {forecast_usage} kWh. "
        f"At an estimated price of {price_per_kwh} ISK per kWh, "
        f"your next bill could be around {forecast_bill} ISK."
    )

    summary = {
        "average_usage": average,
        "max_usage": max_usage,
        "total_usage": total,
        "highest_day": highest_day,
        "energy_score": energy_score,
        "energy_label": energy_label,
        "forecast_usage": forecast_usage,
        "forecast_bill": forecast_bill,
    }

    insights = generate_ai_insights(summary)
    savings_report = generate_savings_report(summary)

    return {
        "average_usage": average,
        "max_usage": max_usage,
        "total_usage": total,
        "energy_score": energy_score,
        "energy_label": energy_label,
        "forecast_usage": forecast_usage,
        "forecast_bill": forecast_bill,
        "forecast_confidence": forecast_confidence,
        "forecast_explanation": forecast_explanation,
        "highest_day": highest_day,
        "ai_tip": ai_tip,
        "insights": insights,
        "daily_usage": df.to_dict(orient="records"),
        "savings_report": savings_report,
    }


@app.get("/")
def root():
    return {"message": "VoltWise API is running"}


@app.get("/stats")
def stats():
    df = pd.read_csv("data/usage.csv")
    return analyze_dataframe(df)



@app.post("/upload")
async def upload_csv(
    file: UploadFile = File(...),
    user_id: str = Form(...)
):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    if "date" not in df.columns or "usage_kwh" not in df.columns:
        return {"error": "CSV must contain date and usage_kwh columns"}

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        insert into energy_uploads (user_id, filename)
        values (%s, %s)
        returning id
        """,
        (user_id, file.filename),
    )

    upload_id = cursor.fetchone()[0]

    for _, row in df.iterrows():
        cursor.execute(
            """
            insert into energy_usage (upload_id, usage_date, usage_kwh)
            values (%s, %s, %s)
            """,
            (upload_id, row["date"], float(row["usage_kwh"])),
        )

    conn.commit()
    cursor.close()
    conn.close()

    return analyze_dataframe(df)

@app.post("/chat")
def chat(request: ChatRequest):
    df = pd.read_csv("data/usage.csv")
    energy_summary = df.to_dict(orient="records")

    answer = ask_voltwise(request.question, energy_summary)

    return {"answer": answer}


@app.get("/user-data/{user_id}")
def get_user_data(user_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT usage_date, usage_kwh
        FROM energy_usage eu
        JOIN energy_uploads up
        ON eu.upload_id = up.id
        WHERE up.user_id = %s
        ORDER BY usage_date
        """,
        (user_id,)
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    if not rows:
        return {"error": "No data found"}

    df = pd.DataFrame(rows, columns=["date", "usage_kwh"])

    return analyze_dataframe(df)