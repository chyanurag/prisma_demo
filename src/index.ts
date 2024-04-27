import { PrismaClient } from "@prisma/client"
import express from "express"
import { Request, Response } from "express"
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

const prisma = new PrismaClient()

app.get('/', async (req: Request, res: Response) => {
    const blogs = await prisma.post.findMany()
    res.render('index', { blogs })
})

app.get('/blog/:blogId', async (req, res) => {
    const blog = await prisma.post.findMany({
        where: {
            id: parseInt(req.params.blogId)
        }
    })
    if(blog.length > 0){
        res.render('blog', { 'blog': blog[0] })
    } else {
        res.render('error')
    }
})

app.get('/new', (req: Request, res: Response) => {
    res.render('new')
})

app.post('/new', async (req: Request, res : Response) => {
    const { title, content } = req.body;
    if (!title || !content){
        res.render('new')
    } else {
        await prisma.post.create({
            data: {
                title,
                content
            }
        })
        res.redirect('/')
    }
})

app.post('/delete', async (req: Request, res: Response) => {
    try{
        await prisma.post.delete({ 
            where: {
                id: parseInt(req.body.blogId)
            }
        })
    } catch {
    } finally {
        res.redirect('/')
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
