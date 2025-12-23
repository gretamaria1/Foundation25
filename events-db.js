import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Use the default Firebase app that you initialized in firebase.js
const db = getFirestore();

/**
 * Save a new event to Firestore
 */
export async function createEvent(userId, eventData) {
  if (!userId) {
    throw new Error("Missing user id");
  }

  const docRef = await addDoc(collection(db, "events"), {
    ...eventData,
    ownerUid: userId,
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
}

export async function getEventsForUser(userId) {
  if (!userId) {
    throw new Error("Missing user id");
  }

  // Only filter by ownerUid in Firestore
  const q = query(
    collection(db, "events"),
    where("ownerUid", "==", userId)
  );

  const snapshot = await getDocs(q);

  const events = [];
  snapshot.forEach((doc) => {
    events.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return events;
}