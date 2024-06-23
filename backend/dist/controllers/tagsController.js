import articlesModel from "../models/articlesModel.js";
export const tagsAll = async (req, res) => {
    try {
        const allArticles = await articlesModel.find().populate('user').exec();
        const tags = allArticles.map((elem) => elem.tags);
        res.status(200).json(tags);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Возникла ошибка',
        });
    }
};
