import { RoomRepository } from './../repositories/roomRepository';
import { Request, Response } from 'express';
export class RoomController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ error: 'Name is required' })
        }
        try {
            const newRoom = RoomRepository.create({
                name,
                description
            })
            await RoomRepository.save(newRoom)
            return res.status(201).json(newRoom)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}