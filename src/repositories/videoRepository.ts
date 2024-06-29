import { Video } from './../entities/Video';
import { AppDataSource } from '../data-source';


export const VideoRepository = AppDataSource.getRepository(Video); 