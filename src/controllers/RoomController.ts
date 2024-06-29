import { VideoRepository } from './../repositories/videoRepository';
import { RoomRepository } from './../repositories/roomRepository';
import { Request, Response } from 'express';
import { BadRequestError } from '../helpers/api-erros';
export class RoomController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body
        if (!name) {
            throw new BadRequestError('Nome é obrigatório');
        }

        const newRoom = RoomRepository.create({
            name,
            description
        })
        await RoomRepository.save(newRoom)
        return res.status(201).json(newRoom)

    }


    async createVideo(req: Request, res: Response) {
        const { title, url } = req.body
        const { idRoom } = req.params

        const room = await RoomRepository.findOne({ where: { id: Number(idRoom) } })

        if (!room) {
            throw new BadRequestError('Aula não existe')
        }
        const newVideo = VideoRepository.create({
            title,
            url,
            room,
        })

        await VideoRepository.save(newVideo)
        return res.status(201).json(newVideo)
    }
}