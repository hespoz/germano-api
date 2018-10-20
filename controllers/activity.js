import {Activity} from "../models/activity";
import {User} from "../models/user";
import {Bucket, Sentence} from "../models/bucket";
import {map} from "lodash";
import moment from "moment";

export const saveComment = async (bucket, sentence, fromUser, comment) => {

    if(String(bucket.ownerId) !== String(fromUser._id)){
        let newHistory = new Activity()
        newHistory.type = "COMMENT"
        newHistory.bucket = bucket
        newHistory.sentence = sentence
        newHistory.comment = comment
        newHistory.toUser = await User.findById(bucket.ownerId)
        newHistory.fromUser = await User.findById(fromUser._id)

        return await newHistory.save()
    }
    return null
}

export const saveMention = async (bucket, sentence, fromUser, toUser , comment) => {

    let newHistory = new Activity()
    newHistory.type = "TAG"
    newHistory.bucket = bucket
    newHistory.sentence = sentence
    newHistory.comment = comment
    newHistory.toUser = await User.findById(toUser._id)
    newHistory.fromUser = await User.findById(fromUser._id)

    return await newHistory.save()

}

export const fetchActivity = async (user, limit) => {
    await Activity.find({$or:[{fromUser: user._id}, {toUser: user._id}]}).limit(limit)

    let result = await Activity.find({$or:[{fromUser: user._id}, {toUser: user._id}]}).limit(limit)


    let parsedResult = []

    for (let i = 0; i < result.length; i++) {
        const activity = result[i]
        parsedResult.push({
            time: moment(activity.time).format('MMMM DD YYYY'),
            type: activity.type,
            bucket: await Bucket.findById(activity.bucket),
            sentence: await Sentence.findById(activity.sentence),
            comment: activity.comment,
            toUser: await User.findById(activity.toUser),
            fromUser: await User.findById(activity.fromUser)
        })
    }

        return parsedResult

}
