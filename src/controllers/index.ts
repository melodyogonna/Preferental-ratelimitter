const {Request, Response} from 'express'

export default MainController{
   async static checkRate(req: Request, res: Response): Promise<Response>{
      res.send('Hello World')
   }
}