import { TweetInstance as tweet } from './axios';
import axios from 'axios';
import { tweetBaseUrl } from '@/config.js';

//关注用户
export function updateFollow(params){
    return tweet.put('/subscription',params,{params})
}

//取关用户
export function deleteFollow(params){
    return tweet.delete('/subscription',{params})
}

export function getFollow(params){
    return tweet.get('/subscription',{params})
}

export function getAllFollow(uid){
    return tweet.get('/subscriptionList/' + uid)
}

//推荐关注列表
export function getRecommentList(uid){
    return tweet.get('/recommend/'+ uid)
}

//点赞api
export function addLikes(params){
    return tweet.put('/likes',params,{params})
}

//取消点赞api
export function deleteLikes(params){
    return tweet.delete('/likes',{params})
}

//获取个人界面的动态
export function getSelfTweet(params){
    return tweet.get('/self',{params})
}

//查看关注者的动态id
export function getOtherTweet(params){
    return tweet.get('/tweetList',{params})
}

//获取动态所有的评论
export function getAllComments(params){
    return tweet.get('/comment/'+params.tweetId)
}

//发表评论
export function addComment(params){
    return tweet.post('/comment',params,{params})
}

//删除评论
export function deleteComment(params){
    return tweet.delete('/comment/',{params})
}

//发布动态
export function addTweet(params){
    return axios({
        method: 'put',
        baseURL: tweetBaseUrl,
        url: '',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: params,
    });
}

export function deleteTweet(tweetId){
    return tweet.delete('/' + tweetId)
}