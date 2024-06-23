import articlesModel from '../models/articlesModel.js'
import CommentSchema from '../models/commentsModel.js'


export const getComments = async (req: any, res: any) => {
	try {
    console.log(req.params.id)
		const newComment = new CommentSchema({
			author: req.userId,
			comment: req.body.comment,
		})
		const data = await newComment.save()
		console.log(data)
		await articlesModel.findByIdAndUpdate(req.params.id, {
			$push: { comments: data._id },
		})
		res.json(newComment)
	} catch (err) {}
}
