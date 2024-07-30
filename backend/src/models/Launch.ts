import { Schema, model } from 'mongoose';

interface Launch {
  flight_id:string;
  flight_number: number;
  name: string;
  date_utc: Date;
}

const LaunchSchema = new Schema<Launch>({
  flight_id: { type: String, required: true },
  flight_number: { type: Number, required: true },
  name: { type: String, required: true },
  date_utc: { type: Date, required: true }
});

export default model<Launch>('Launch', LaunchSchema);
