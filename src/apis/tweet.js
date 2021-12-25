import {TweetInstance as tweet} from './axios'

//关注用户
export function updateFollow(params){
    return tweet.put('/tweet/subscription',params,{params})
}

//取关用户
export function deleteFollow(params){
    return tweet.delete('/tweet/subscription',{params})
}

export function getFollow(params){
    return tweet.get('/tweet/subscription',{params})
}

export function getAllFollow(params){
    return tweet.get('/tweet/subscriptionList',{params})
}

//推荐关注列表
export function getRecommentList(params){
    return tweet.get('/tweet/recommend/'+params.unifiedId)
}

//点赞api
export function addLikes(params){
    return tweet.put('/tweet/likes',params,{params})
}

//取消点赞api
export function deleteLikes(params){
    return tweet.delete('/tweet/likes',{params})
}

//获取个人界面的动态
export function getSelfTweet(params){
    return tweet.get('/tweet/self',{params})
}

//查看关注者的动态id
export function getOtherTweet(params){
    return tweet.get('/tweet/tweetList',{params})
}

//获取动态所有的评论
export function getAllComments(params){
    return tweet.get('/tweet/comment/'+params.tweetId)//存疑
}

//发表评论
export function addComment(params){
    return tweet.post('/tweet/comment',params,{params})//存疑
}

//删除评论
export function deleteComment(params){
    return tweet.delete('/tweet/comment/',{params})//存疑
}

//发布动态
export function addTweet(params){
    return tweet.put('/tweet',params,{params})//存疑
}

export function deleteTweet(params){
    return tweet.delete('/tweet'+params.id)//存疑
}