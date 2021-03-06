import {Bucket} from "../models/bucket";
import {User} from "../models/user";
import {Dictionary} from "../models/dictionary";

export const searchById = async (id) => {
    return await Bucket.findById(id)
}

export const removeBucket = async (id) => {
    return await Bucket.findByIdAndRemove(id)
}

export const getLastBuckets = async (number) => {
    return await Bucket.find({}).sort([['time', 'descending']]).limit(number)
}


export const createBucket = async (bucket, ownerId, ownerName) => {

    const result = await Bucket.find({word: bucket.name}).limit(1)

    if (result.length > 0) {
        throw new Error("This bucket is already added")
    }

    let newBucket = new Bucket()
    newBucket.name = bucket.name
    newBucket.ownerId = ownerId
    newBucket.sentences = bucket.sentences
    newBucket.ownerName = ownerName


    if (bucket.wordsIds) {
        let wordsToAdd = []
        for (let i = 0; i < bucket.wordsIds.length; i++) {
            let word = await Dictionary.findById(bucket.wordsIds[i])
            if (word) {
                wordsToAdd.push(word)
            }
        }

        newBucket.words = wordsToAdd
    }

    return await newBucket.save()

}

export const updateBucket = async (newBucket, ownerId) => {

    let updatedBucket = await Bucket.findById(newBucket._id)

    if (!updatedBucket){
        throw new Error("This bucket does not exist")
    }

    if (String(ownerId) !== String(updatedBucket.ownerId)) {
        throw new Error("You don't have permissions to update this bucket")
    }

    if(newBucket.name) {
        updatedBucket.name = newBucket.name
    }

    if(newBucket.sentences) {
        updatedBucket.sentences = newBucket.sentences
    }

    if(newBucket.wordsIds) {
        let wordsToAdd = []
        for (let i = 0; i < newBucket.wordsIds.length; i++) {
            let word = await Dictionary.findById(newBucket.wordsIds[i])
            console.log(word, newBucket.wordsIds[i])
            if (word) {
                wordsToAdd.push(word)
            }
        }

        updatedBucket.words = wordsToAdd
    }

    return await updatedBucket.save()

}


export const fetchBucketsByUserName = async (username) => {
    const user = await User.findOne({username})
    if(!user) {
        return {}
    }
    return await Bucket.find({ownerId:user._id}).sort([['time', 'descending']])
}
