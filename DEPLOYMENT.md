# Deployment Guide: Node.js Backend & React Native Frontend

Deploying your project involves two main phases: deploying the Node.js backend to a cloud provider and building the React Native frontend application into installable packages for Android and iOS using Expo.

---

## Part 1: Deploying the Backend (Node.js/Express)

To deploy your backend, we recommend using a platform like **Render**, **Railway**, or **Heroku**. In this guide, we'll use Render as an example due to its simplicity and free tier.

### 1. Preparation
Before deploying, make sure your backend is ready for a production environment.
- Ensure your `package.json` has a `start` script defined (e.g., `"start": "node index.js"`). Your project already has this set up!
- Ensure all sensitive configurations (like `MONGO_URI`, `JWT_SECRET`, Port, and Email credentials) are retrieved from environment variables (`process.env.VAR_NAME`).
- Update the `cors` settings in your Express app to allow traffic from anywhere, or configure it to accept specifically your frontend app's requests.
- **Database**: If you're using a local MongoDB, migrate your data to a cloud database service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Make sure to whitelist IP addresses to allow access from everywhere (`0.0.0.0/0`) since cloud instances change IPs dynamically.

### 2. Push Code to Git
Initialize a git repository if you haven't already, and push the `server` directory to GitHub, GitLab, or Bitbucket. It's often easier to make the `server` folder its own repository or deploy a specific subfolder if it's a monorepo. 

### 3. Deploy to Render
1. Go to [Render.com](https://render.com/) and create an account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub/GitLab account and select your backend repository.
4. **Configuration**:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**: Add all the variables from your local `.env` file into the Render dashboard (e.g., `PORT=10000`, `MONGO_URI=mongodb+srv://...`).
6. Click **Create Web Service**. Render will now build and deploy your app.
7. Note down the **Live URL** Render assigns you (e.g., `https://quiz-app-server-xyz.onrender.com`).

---

## Part 2: Deploying the Frontend (React Native + Expo)

We'll use **EAS (Expo Application Services)** to compile your React Native code into native apps (APK, AAB, or IPA).

### 1. Update API Endpoints
Before building, critical point: **Update your API base URL**.
Currently, your app might be using local IPs like `http://192.168.1.5:5000`. You must change this across your app (usually in an `api.js` file or Axios configuration) to the **Production Live URL** of your deployed backend.

`const BASE_URL = 'https://quiz-app-server-xyz.onrender.com';`

### 2. Setup EAS CLI
Open a terminal in the `client` folder.
1. Install EAS CLI globally via npm:
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account (create one at expo.dev if you haven't):
   ```bash
   eas login
   ```
3. Initialize your Expo project for EAS:
   ```bash
   eas build:configure
   ```
   This will create an `eas.json` file in your client folder.

### 3. Build for Android
You have two main build options for Android:
- **APK**: An installable file you can directly install on any Android phone (for testing).
- **AAB**: An Android App Bundle to publish to the Google Play Store.

To configure an APK build for testing, update your `eas.json` file to include:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    ...
  }
}
```

**Run the build command:**
- For **testing (APK)**: `eas build -p android --profile preview`
- For **production (AAB for Play Store)**: `eas build -p android --profile production`

Once the build finishes, Expo will provide you with a link to download the `.apk` or `.aab` file. You can install the `.apk` directly onto an Android device.

### 4. Build for iOS (Requires Apple Developer Account)
To build an iOS app, you must have an active paid Apple Developer account ($99/year).
Run the following build command:
```bash
eas build -p ios
```
EAS will prompt you to log in to your Apple account to manage provisioning profiles and certificates automatically. Once completed, you'll receive a build you can submit to TestFlight or the App Store via Expo.
