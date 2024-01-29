import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import serviceAccount from "../../../weather-info-monitoring-firebase.json";

// Firebaseがまだ初期化されていない場合にのみ初期化を行う
if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert(serviceAccount as admin.ServiceAccount),
  });
}

import { getFirestore } from "firebase-admin/firestore";
import { Coordinate } from "@/types/apiSchema";
const db = getFirestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coordinate>
) {
  const COLLECTION_NAME = "coordinate";
  const targetDoc = "current";

  const doc = await db.collection(COLLECTION_NAME).doc(targetDoc).get();
  const data = doc.data();

  if (!data) {
    return res.status(404).json({ error: "Not found" } as any);
  }

  res.status(200).json(data as Coordinate);
}
