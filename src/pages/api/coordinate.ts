// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coordinate } from '@/type/apiSchema'
import type { NextApiRequest, NextApiResponse } from 'next'
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../../../weather-info-monitoring-firebase.json'); // 秘密鍵を取得
const admin = require('firebase-admin');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coordinate>
) {

  const COLLECTION_NAME = 'coordinate'
  const targetDoc="current"
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const doc = await db.collection(COLLECTION_NAME).doc(targetDoc).get();
  res.status(200).json(doc.data());
}
