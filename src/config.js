import AppLogo from '@/assets/tongji.png';
const AppTitle = 'iCampus';
const AppBriefInfo = '用户交互技术Lab4';

const UserServiceURL = '/api/user';
const TweetServiceURL = '/api/tweet';
const RecruitmentServiceURL = '/api/recruit';

let userBaseUrl, tweetBaseUrl, recruitmentBaseUrl;

if (process.env.NODE_ENV === "development") {
    userBaseUrl = UserServiceURL;
    tweetBaseUrl = TweetServiceURL;
    recruitmentBaseUrl = RecruitmentServiceURL;
}
else {
    userBaseUrl = UserServiceURL;
    tweetBaseUrl = TweetServiceURL;
    recruitmentBaseUrl = RecruitmentServiceURL;
}

export {
    AppTitle, AppBriefInfo, AppLogo,
    userBaseUrl, tweetBaseUrl, recruitmentBaseUrl, 
    UserServiceURL, TweetServiceURL, RecruitmentServiceURL
}