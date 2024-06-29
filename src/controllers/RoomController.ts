import { VideoRepository } from './../repositories/videoRepository';
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


    async createVideo(req: Request, res: Response) {
        const { title, url } = req.body
        const { idRoom } = req.params

        try {
            const room = await RoomRepository.findOne({ where: { id: Number(idRoom) } })

            if (!room) {
                return res.status(404).json({ error: 'Room not found' })
            }
            const newVideo = VideoRepository.create({
                title,
                url,
                room,
            })

            await VideoRepository.save(newVideo)
            return res.status(201).json(newVideo)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }
}