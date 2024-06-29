import { Request, Response } from 'express';
import { SubjectRepository } from '../repositories/subjectRepository';

export class SubjectController {
    async create(req: Request, res: Response) {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        try {
            const newSubject = SubjectRepository.create({
                name
            })
            await SubjectRepository.save(newSubject);
            return res.status(201).json(newSubject);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}