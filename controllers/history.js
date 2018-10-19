import {History} from "../models/history";

export const saveHistory = async (bucket, sentence, user) => {

    let newHistory = new History()
    newHistory.bucketId = bucket._id
    newHistory.bucketName = bucket.bucketName
    newHistory.ownerId = bucket.ownerId
    newHistory.ownerName = user.username
    newHistory.sentenceId = sentence._id
    newHistory.sentenceContent = sentence.germanSentence
    newHistory.userId = user._id

    return await newHistory.save()

}

export const fetchHistory = async (user, limit) => {
    console.log(user._id)
   return await History.find({userId: user._id}).limit(limit)
}
