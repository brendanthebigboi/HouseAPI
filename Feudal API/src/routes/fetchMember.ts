import * as express from "express";
import * as database from "../database";
import * as pg from "pg";

const router: express.Router = express.Router();
const db: pg.Pool = database.pool;

router.get('/:userId', async (req, res) => {
    try {
        let params: object = req.params;
        let queryString: string = "SELECT * FROM users";
        let queryResults: any = await db.query(queryString);

        let objectUsers: Array<object> = [];
        
        for (let i = 0; i < queryResults.rows.length; i++) {
            
            let userId: number = queryResults.rows[i]['user_id'];
            let house: string = queryResults.rows[i]['house'];
            let points: number = queryResults.rows[i]['points'];
            let joinedAt: Date = queryResults.rows[i]['joined_at'];

            objectUsers.push({
                userId: userId,
                house: house,
                points: points,
                joined_at: joinedAt
            });

        }

        let sortedScores: Array<object> = objectUsers;
        sortedScores.sort((a, b): number => {
            let pointsA: number = a['points'];
            let pointsB: number = b['points'];
            return pointsA - pointsB;
        });
        sortedScores.reverse();

        let currentRank: number = 0;
        let userRank: number = 0;
        let userObject: object = {};
        let userHouse: string = null;

        for (let i = 0; i < sortedScores.length; i++) {

            currentRank += 1;
            
            if (sortedScores[i]['userId'] == params['userId']) {
                userObject = sortedScores[i];
                userObject['globalRank'] = currentRank;
                userHouse = sortedScores[i]['house'];
            }
        }

        let houseQuery: string = "SELECT * FROM users WHERE house=$1";
        let houseUsers: any = await db.query(houseQuery, [userHouse]);
        let houseObjects: Array<object> = [];
        
        for (let i = 0; i < houseUsers.rows.length; i++) {
            
            let userId: number = houseUsers.rows[i]['user_id'];
            let house: string = houseUsers.rows[i]['house'];
            let points: number = houseUsers.rows[i]['points'];
            let joinedAt: Date = houseUsers.rows[i]['joined_at'];

            houseObjects.push({
                userId: userId,
                house: house,
                points: points,
                joined_at: joinedAt,
                globalRank: userObject['globalRank']
            });

        }

        let houseScores: Array<object> = houseObjects;
        houseScores.sort((a, b): number => {
            let pointsA: number = a['points'];
            let pointsB: number = b['points'];
            return pointsA - pointsB;
        });
        houseScores.reverse();
        let houseRank: number = 0;

        for (let i = 0; i < houseScores.length; i++) {

            houseRank += 1;
            
            if (houseScores[i]['userId'] == params['userId']) {
                userObject = houseScores[i];
                userObject['houseRank'] = houseRank;
                userHouse = houseScores[i]['house'];
                userObject['house'] = userHouse;
            }
        }

        userObject['success'] = true;

        res.send(JSON.stringify(userObject));
    } catch(e) {
        res.send(JSON.stringify({
            success: false,
            error: e
        }))
    }

})

export = router;