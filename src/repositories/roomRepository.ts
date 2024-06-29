import { Room } from './../entities/Room';
import { AppDataSource } from './../data-source';


export const RoomRepository = AppDataSource.getRepository(Room); 