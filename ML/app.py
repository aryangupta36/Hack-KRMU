from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json
from gemini_service import generate_action_plan

app = FastAPI()

IMG_SIZE = 224
MODEL_PATH = "model/model.h5"

# Load model once at startup
model = tf.keras.models.load_model(MODEL_PATH)

with open("model/class_names.json") as f:
    class_names = json.load(f)

# In-memory cache for LLM responses
action_cache = {}


def preprocess(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = preprocess(contents)

    predictions = model.predict(img)
    class_index = int(np.argmax(predictions))
    confidence = float(np.max(predictions))

    disease = class_names[class_index]

    # 🔥 Cache Check
    if disease in action_cache:
        action_plan_json = action_cache[disease]
    else:
        action_plan = generate_action_plan(disease)

        try:
            action_plan_json = json.loads(action_plan)
        except:
            action_plan_json = {"raw_response": action_plan}

        action_cache[disease] = action_plan_json

    return {
        "action_plan": action_plan_json
    }
