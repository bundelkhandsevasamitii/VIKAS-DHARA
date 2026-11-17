// firebase-config.js
// 1. अपनी असली Firebase Config यहाँ डालें
const firebaseConfig = {
    apiKey: "AIzaSyDIZRUqYkdBcia4qx9_O8EagcLCfpUFv_U",
  authDomain: "jan-soochna-portal.firebaseapp.com",
  databaseURL: "https://jan-soochna-portal-default-rtdb.firebaseio.com",
  projectId: "jan-soochna-portal",
  storageBucket: "jan-soochna-portal.firebasestorage.app",
  messagingSenderId: "203359131435",
  appId: "1:203359131435:web:63f61a3397eea85938d76e",
  measurementId: "G-4NLFXTLPKB"
};

// 2. Firebase इनिशियलाइज करें
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ==========================================
// 3. ग्लोबल हेल्पर फंक्शन्स (Data Read / Write)
// ==========================================

/**
 * किसी भी गाँव का डेटा डेटाबेस में सेव (Write) करने के लिए
 * @param {string} villageId - यूनिक गाँव की आईडी (उदा. madhya_pradesh__chhatarpur__ghatra)
 * @param {object} villageData - गाँव की सुविधाएं और सार्वजनिक स्थानों का डेटा
 */
async function saveVillageDataToCloud(villageId, villageData) {
    try {
        await db.collection("villages").doc(villageId).set(villageData, { merge: true });
        console.log("डेटा सफलताપूर्वक सेव हो गया!");
        return true;
    } catch (error) {
        console.error("डेटा सेव करने में त्रुटि:", error);
        return false;
    }
}

/**
 * किसी भी गाँव का डेटा डेटाबेस से पढ़ने (Read) के लिए
 * @param {string} villageId - यूनिक गाँव की आईडी
 */
async function getVillageDataFromCloud(villageId) {
    try {
        const docRef = db.collection("villages").doc(villageId);
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            return { exists: true, data: docSnap.data() };
        } else {
            return { exists: false, data: null };
        }
    } catch (error) {
        console.error("डेटा पढ़ने में त्रुटि:", error);
        return { exists: false, error: error };
    }
}
