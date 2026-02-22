# from groq import Groq
# from dotenv import load_dotenv
# import os
# import json

# # Load environment variables
# load_dotenv()

# # Initialize Groq client
# client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# def generate_action_plan(disease: str) -> str:
#     """
#     Generate a structured 7-day treatment plan for a detected crop disease.
#     Returns raw JSON string.
#     """

#     prompt = f"""
# You are a certified agricultural plant pathologist.

# Generate a scientifically accurate 7-day treatment plan
# for {disease} in apple crops.

# STRICT OUTPUT RULES:

# - Return ONLY valid JSON.
# - No markdown.
# - No explanations.
# - No comments.
# - No extra fields.
# - No trailing commas.
# - All 7 days must exist.
# - Each day must contain:
#     - "focus" (string)
#     - "tasks" (array of 3 to 5 strings)
# - "confidence" must be an INTEGER between 1 and 100.
# - "description" must be a non-empty string, between 50-100 words.
# - "action_steps" must be an array of exactly 3 concise strings.
# - "action_steps" should never be missing

# JSON SCHEMA (STRICTLY FOLLOW THIS STRUCTURE):

# {{
#   "disease": "{disease}",
#   "confidence": 85,
#   "description": "Detailed scientific explanation of the disease...",
#   "action_steps": [
#     "Immediate action step 1",
#     "Immediate action step 2",
#     "Immediate action step 3"
#   ],
#   "action_plan": {{
#     "day_1": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }},
#     "day_2": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }},
#     "day_3": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }},
#     "day_4": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }},
#     "day_5": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }},
#     "day_6": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }},
#     "day_7": {{ "focus": "Focus area", "tasks": ["Task 1", "Task 2", "Task 3"] }}
#   }}
# }}
# """



#     try:
#         completion = client.chat.completions.create(
#             model="llama3-70b-8192",  # Best balance quality/free
#             messages=[
#                 {"role": "system", "content": "You must return strictly valid JSON."},
#                 {"role": "user", "content": prompt}
#             ],
#             temperature=0.6
#         )

#         content = completion.choices[0].message.content.strip()

#         # Optional: Validate JSON before returning
#         json.loads(content)

#         return content

#     except Exception as e:
#         print("Groq error:", e)

#         # Fallback plan (never crash FastAPI)
#         fallback = {
#             "disease": disease,
#             "confidence": 0.75,
#             "description": "Basic fallback treatment plan.",
#             "action_plan": {
#                 "day_1": {"focus": "Isolation", "tasks": ["Remove infected leaves", "Inspect nearby plants", "Disinfect tools"]},
#                 "day_2": {"focus": "Fungicide", "tasks": ["Apply fungicide", "Ensure coverage", "Avoid rain exposure"]},
#                 "day_3": {"focus": "Monitoring", "tasks": ["Check lesion spread", "Photograph progress", "Record symptoms"]},
#                 "day_4": {"focus": "Soil health", "tasks": ["Check drainage", "Improve airflow", "Remove debris"]},
#                 "day_5": {"focus": "Reapplication", "tasks": ["Reapply treatment if needed", "Inspect canopy", "Remove fallen leaves"]},
#                 "day_6": {"focus": "Nutrient support", "tasks": ["Add micronutrients", "Check pH", "Irrigate moderately"]},
#                 "day_7": {"focus": "Evaluation", "tasks": ["Compare progress", "Plan next spray", "Document results"]}
#             }
#         }

#         return json.dumps(fallback)



from groq import Groq
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_action_plan(disease: str) -> str:
    """
    Generate structured 7-day treatment plan.
    Returns VALID JSON string.
    """

    


    prompt = f"""
Explain {disease} in apple crops.

Requirements:
- 80-120 words
- Scientifically accurate
- No markdown
- No extra formatting
"""

    try:
        print("Calling Groq for disease:", disease)

        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Explain the importance of fast language models",
                }
            ],
            model="llama-3.3-70b-versatile",
        )

        print(completion.choices[0].message.content)

        content = completion.choices[0].message.content.strip()

        # 🔥 Remove markdown fences if present
        if content.startswith("```"):
            content = content.replace("```json", "").replace("```", "").strip()

        print("Raw model output:\n", content)

        parsed = json.loads(content)

        # 🔥 Normalize confidence
        confidence = parsed.get("confidence", 50)

        try:
            confidence = int(round(float(confidence)))
        except:
            confidence = 50

        confidence = max(1, min(100, confidence))
        parsed["confidence"] = confidence

        # 🔥 Ensure required fields exist
        if not parsed.get("description"):
            parsed["description"] = "Scientific description unavailable."

        if not isinstance(parsed.get("action_steps"), list):
            parsed["action_steps"] = [
                "Monitor crop health closely.",
                "Remove infected material.",
                "Apply recommended treatment."
            ]

        if len(parsed["action_steps"]) != 3:
            parsed["action_steps"] = parsed["action_steps"][:3]
            while len(parsed["action_steps"]) < 3:
                parsed["action_steps"].append("Continue monitoring plant health.")

        return json.dumps(parsed)

    except Exception as e:
        print("Groq API or JSON error:", e)

        # 🔥 Safe fallback (complete structure)
        fallback = {
            "disease": disease,
            "confidence": 75,
            "description": "Basic fallback treatment plan due to AI service issue.",
            "action_steps": [
                "Remove visibly infected leaves.",
                "Apply recommended fungicide.",
                "Monitor plant daily for changes."
            ],
            "action_plan": {
                "day_1": {"focus": "Isolation", "tasks": ["Remove infected leaves", "Inspect nearby plants", "Disinfect tools"]},
                "day_2": {"focus": "Fungicide", "tasks": ["Apply fungicide", "Ensure coverage", "Avoid rain exposure"]},
                "day_3": {"focus": "Monitoring", "tasks": ["Check lesion spread", "Photograph progress", "Record symptoms"]},
                "day_4": {"focus": "Soil health", "tasks": ["Check drainage", "Improve airflow", "Remove debris"]},
                "day_5": {"focus": "Reapplication", "tasks": ["Reapply treatment if needed", "Inspect canopy", "Remove fallen leaves"]},
                "day_6": {"focus": "Nutrient support", "tasks": ["Add micronutrients", "Check pH", "Irrigate moderately"]},
                "day_7": {"focus": "Evaluation", "tasks": ["Compare progress", "Plan next spray", "Document results"]}
            }
        }

        return json.dumps(fallback)