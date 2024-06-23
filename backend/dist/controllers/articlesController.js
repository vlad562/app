import articlesModel from '../models/articlesModel.js';
import userModel from '../models/userModel.js';
export const getArticles = async (req, res) => {
    try {
        const allArticles = await articlesModel.find().populate('user').exec();
        res.status(200).json(allArticles);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Возникла ошибка',
        });
    }
};
export const getOneArticles = async (req, res) => {
    try {
        const articlesId = req.params['id'];
        articlesModel
            .findOneAndUpdate({
            _id: articlesId,
        }, {
            $inc: { viewCount: 1 },
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Возникла ошибка',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена',
                });
            }
            res.json(doc);
        })
            .populate('user')
            .populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: userModel,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Возникла ошибка',
        });
    }
};
export const postArticles = async (req, res) => {
    try {
        const newArticles = await new articlesModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            user: req.userId,
            imageUrl: req.body.imageUrl,
            comments: [],
        }).populate('user');
        const post = await newArticles.save();
        res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Возникла ошибка',
        });
    }
};
export const putArticles = async (req, res) => {
    try {
        const articlesId = req.params['id'];
        console.log(req.body);
        await articlesModel.updateOne({
            _id: articlesId,
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            user: req.userId,
            imageUrl: req.body.imageUrl
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Возникла ошибка',
        });
    }
};
export const deleteArticles = async (req, res) => {
    try {
        const articlesId = req.params.id;
        console.log(req.params.id);
        articlesModel.findOneAndDelete({ _id: articlesId }, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: 'Возникла ошибка',
                });
            }
            if (!doc)
                res.status(404).json({
                    message: 'Статьи не существует',
                });
            res.sendStatus(200);
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Произошла ошибка',
        });
    }
};
export const getCommentsArticles = async (req, res) => {
    const articlesId = req.params['id'].slice(1);
    console.log(articlesId);
    const data = await articlesModel
        .findOne({ _id: articlesId })
        .populate('comments')
        .populate('author');
    console.log(data?.comments);
};
