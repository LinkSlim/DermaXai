# 🩺 Skin Lesion Classifier Frontend

**Description:**
This repository contains the frontend application developed for a Master's Thesis (TFM) focused on skin lesion classification. The web interface allows users to upload dermatological images alongside clinical metadata (age, sex, and lesion localization) for AI-driven analysis. Beyond displaying the predicted classification and confidence scores, the application integrates Explainable AI (XAI) visualizations—including **Grad-CAM, LIME, and SHAP**—to help users interpret and understand the model's diagnostic decisions.

## Run Web Server
Make sure you have the dependencies installed.  
If you don't have them, run the following in the terminal:
```bash
npm install
```

Then run the following command to start the web server at http://localhost:5173/ :
```bash
npm run dev
```

## Share with a URL
Use `ngrok` to share your web server with someone else.  
Run the following in the terminal:
```bash
ngrok http 5173
```

Then, ngrok will give you a URL that you can share with someone else.  
That URL will be something like `https://finishing-bloating-ongoing.ngrok-free.dev`.
