import {Bucket} from "../models/bucket";
import {findIndex} from "lodash";


const getBucketBySentenceAndCommentId = async (sentenceId, commentId) => {
    let result = await Bucket.find({
        $and: [
            {'sentences': {$elemMatch: {_id: sentenceId}}},
            {'sentences.comments' : {$elemMatch: {_id: commentId}} }
        ]
    })

    return result[0]
}

export const addComment = async (sentenceId, comment) => {
    let result = await Bucket.find({'sentences': {$elemMatch:{_id:sentenceId}}})
    let bucket = result[0]

    if (!bucket) {
        throw new Error("This sentence does not exist")
    }

    const index = findIndex(bucket.sentences, (s) => String(s._id) === sentenceId)

    let sentence = bucket.sentences[index]

    if (sentence.comments) {
        sentence.comments.push({comment})
    } else {
        sentence.comments = [{comment}]
    }

    return await bucket.save()
}


export const editComment = async (sentenceId, commentId, text) => {

    let bucket = await getBucketBySentenceAndCommentId(sentenceId, commentId)

    if (!bucket) {
        throw new Error("This comment does not exist")
    }

    const index = findIndex(bucket.sentences, (s) => String(s._id) === sentenceId)
    let sentence = bucket.sentences[index]

    const indexComment = findIndex(sentence.comments, (s) => String(s._id) === commentId)

    bucket.sentences[index].comments[indexComment].comment = text

    return await bucket.save()

}


export const removeComment = async (sentenceId, commentId) => {
    let bucket = await getBucketBySentenceAndCommentId(sentenceId, commentId)

    if (!bucket) {
        throw new Error("This comment does not exist")
    }

    const index = findIndex(bucket.sentences, (s) => String(s._id) === sentenceId)
    let sentence = bucket.sentences[index]

    const indexComment = findIndex(sentence.comments, (s) => String(s._id) === commentId)

    sentence.comments.splice(indexComment, 1)

    return await bucket.save()
}
