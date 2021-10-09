import express from 'express';
import controller from '../controllers/member';

const router = express.Router();

router.post('/register',  controller.register);
router.get('/getAllMembers', controller.getAllMembers);
router.get('/getOneMember', controller.getOneMember);
router.put('/updateMember', controller.updateMember);
router.delete('/deleteMember', controller.deleteMember);

export = router;