const UserServiceURL = '/api/user';
const TweetServiceURL = '/api/tweet';
const RecruitmentServiceURL = '/api/recruit';

const AppTitle = 'iCampus';
const AppLogoUrl = '@/assets/tongji.png';
const AppBriefInfo = '同济大学软件工程用户交互技术';

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
    AppTitle, AppBriefInfo,
    userBaseUrl, tweetBaseUrl, recruitmentBaseUrl,
    UserServiceURL, TweetServiceURL, RecruitmentServiceURL
}