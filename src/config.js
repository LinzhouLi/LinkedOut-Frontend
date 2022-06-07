import AppLogo from '@/assets/logo.png';
const AppTitle = 'LinkedOut';
const AppBriefInfo = '软件测试项目';

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