import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (request, response) =>{
    // return response.json({ message: 'Hello Word!'});
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    const trx = await db.transaction();
    
    try {
        const insertUsersIds = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });
    
        const user_id = insertUsersIds[0];
    
        const insertedClassesID = await trx('classes').insert({
            subject, 
            cost, 
            user_id,
        });
    
        const class_id = insertUsersIds[0];
    
        const classSchedule = schedule.map((scheduleItem:ScheduleItem) =>{    
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
        //map percorre cada um dos itens do schedule e transforma em um novo objeto
    
        await trx('classes_schedule').insert(classSchedule);
    
        await trx.commit();
    
        return response.status(201).send();
    } catch (err) {

        await trx.rollback();

        console.log(err);
        return response.status(400).json({
            error: 'Unexpeted error while creating a new class'
        })
    }

});

export default routes;