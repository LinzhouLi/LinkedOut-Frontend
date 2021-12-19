import {TweetInstance as tweet} from './axios'

export function updateFollow(params){
    return tweet.put('/tweet/subscription',params)
}

export function deleteFollow(params){
    return tweet.delete('/tweet/subscription',{params})
}

export function getFollow(params){
    return tweet.get('/tweet/subscription',{params})
}

export function getAllFollow(params){
    return tweet.get('/tweet/subscriptionList',{params})
}

export function getRecommentList(params){
    return tweet.get('/tweet/recommend',{params})
}

export function addLikes(params){
    return tweet.get('/tweet/likes',{params})
}

export function deleteLikes(params){
    return tweet.delete('/tweet/likes',{params})
}

export function getSelfTweet(params){
    return tweet.get('/tweet/self',{params})
}

export function getOtherTweet(params){
    return tweet.get('/tweet/tweetList',{params})
}

export function getAllComments(params){
    return tweet.get('/tweet/comment/'+params.id)//存疑
}

export function addComment(params){
    return tweet.post('/tweet/comment/',params)//存疑
}

export function deleteComment(params){
    return tweet.delete('/tweet/comment/',{params})//存疑
}

export function addTweet(params){
    return tweet.put('/tweet',params)//存疑
}

export function deleteTweet(params){
    return tweet.delete('/tweet'+params.id)//存疑
}