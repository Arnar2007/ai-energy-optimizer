import json
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def ask_voltwise(question, energy_summary):
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=f"""
You are VoltWise, an AI energy coach.

Energy data:
{energy_summary}

User question:
{question}

Give a helpful, practical answer.
""",
    )

    return response.output_text


def generate_ai_insights(summary):
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=f"""
You are VoltWise, an AI energy advisor.

Based on this electricity summary:
{summary}

Generate exactly 4 short insights.

Rules:
- One sentence each.
- Focus on savings, efficiency, unusual usage and forecast.
- Return only the four insights.
""",
    )

    return response.output_text.split("\n")


def generate_savings_report(summary):
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=f"""
You are VoltWise, an AI energy savings analyst.

Based on this electricity summary:
{summary}

Return valid JSON only.

Use this exact structure:
{{
  "total_savings": 18000,
  "recommendations": [
    {{
      "title": "Shift heavy usage to off-peak hours",
      "saving": 8000,
      "reason": "Your highest usage suggests heavy appliances may be running during expensive periods."
    }}
  ]
}}

Rules:
- Include exactly 3 recommendations.
- Savings must be yearly ISK estimates.
- Be realistic and practical.
- Return JSON only.
""",
    )

    try:
        return json.loads(response.output_text)
    except json.JSONDecodeError:
        return {
            "total_savings": 17700,
            "recommendations": [
                {
                    "title": "Shift heavy usage to off-peak hours",
                    "saving": 8200,
                    "reason": "Your highest usage day suggests some heavy appliances may be running at costly times."
                },
                {
                    "title": "Reduce heating slightly",
                    "saving": 6100,
                    "reason": "Small heating adjustments can reduce overall electricity demand."
                },
                {
                    "title": "Run appliances overnight",
                    "saving": 3400,
                    "reason": "Moving flexible usage to lower-demand hours can reduce costs."
                }
            ]
        }