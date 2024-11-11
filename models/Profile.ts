import mongoose, { Schema, Document } from 'mongoose';

interface ProfileDocument extends Document {
  name: string;
  position: string;
  bio: string;
  profilePhoto: string;
  gitLink: string;
  instaLink: string;
  linkedinLink: string;
}

const ProfileSchema = new Schema<ProfileDocument>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  bio: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  gitLink: { type: String, required: true },
  instaLink: { type: String, required: true },
  linkedinLink: { type: String, required: true },
});

export default mongoose.models.Profile || mongoose.model<ProfileDocument>("Profile", ProfileSchema);
