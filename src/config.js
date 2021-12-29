const UserServiceURL = 'http://175.24.202.178:8001/user';
const TweetServiceURL = 'http://175.24.202.178:8003/tweet';
const RecruitmentServiceURL = 'http://175.24.202.178:8005/recruit';

let userBaseUrl, tweetBaseUrl, recruitmentBaseUrl;

if (process.env.NODE_ENV === "development") {
    userBaseUrl = '/user';
    tweetBaseUrl = '/tweet';
    recruitmentBaseUrl = '/recruit';
}
else {
    userBaseUrl = UserServiceURL;
    tweetBaseUrl = TweetServiceURL;
    recruitmentBaseUrl = RecruitmentServiceURL;
}

export { userBaseUrl, tweetBaseUrl, recruitmentBaseUrl, UserServiceURL, TweetServiceURL, RecruitmentServiceURL}