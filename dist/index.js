"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded({ extended: false }));
const prisma = new client_1.PrismaClient();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield prisma.post.findMany();
    res.render('index', { blogs });
}));
app.get('/blog/:blogId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield prisma.post.findMany({
        where: {
            id: parseInt(req.params.blogId)
        }
    });
    if (blog.length > 0) {
        res.render('blog', { 'blog': blog[0] });
    }
    else {
        res.render('error');
    }
}));
app.get('/new', (req, res) => {
    res.render('new');
});
app.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        res.render('new');
    }
    else {
        yield prisma.post.create({
            data: {
                title,
                content
            }
        });
        res.redirect('/');
    }
}));
app.post('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.post.delete({
            where: {
                id: parseInt(req.body.blogId)
            }
        });
    }
    catch (_a) {
    }
    finally {
        res.redirect('/');
    }
}));
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
