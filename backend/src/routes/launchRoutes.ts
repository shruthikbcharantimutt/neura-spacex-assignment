import { Router, Request, Response, NextFunction} from 'express';
import axios from 'axios';
import Launch from '../models/Launch';

interface LaunchProps {
    id:string;
    date_utc: string;
    name:string;
    flight_number: number;
}

const router = Router();

router.get('/', async (req:Request, res:Response,next:NextFunction) => {
  try {
    const response = await axios.get<LaunchProps[]>('https://api.spacexdata.com/v4/launches');
    const launches = response.data;
    launches.sort((a:LaunchProps, b:LaunchProps) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());

    const limitedLaunches = launches.slice(0, 30);

    res.json(limitedLaunches.map((launch: LaunchProps) => ({
      flight_id:launch.id,
      flight_number: launch.flight_number,
      name: launch.name,
      date_utc: launch.date_utc
    })));
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
});

// Save launch to local DB
router.post('/save', async (req:Request, res:Response,next:NextFunction) => {
  try {
    const launch = new Launch(req.body);
    await launch.save();
    res.status(201).json(launch);
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
});

// Get saved launches
router.get('/savedLaunches', async (req:Request, res:Response,next:NextFunction) => {
  try {
    const launches = await Launch.find();
    
    res.json(launches);
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
});

// Delete launch
router.delete('/delete/:id', async (req:Request, res:Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    await Launch.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
});

export default router;
