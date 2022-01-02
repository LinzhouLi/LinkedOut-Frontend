const RegisterRules= {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
      {
        min: 4,
        message: '用户名至少要有4个字符',
        trigger: 'blur',
      },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        min: 5,
        message: '密码至少要有5个字符',
        trigger: 'blur',
      },
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur'},
      { 
        pattern:/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
        message:'邮箱格式错误',
        trigger:'blur'
      }
    ],
    validateCode: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
    ],
  }

const LoginRules={
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      min: 4,
      message: '用户名至少要有4个字符',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 5,
      message: '密码至少要有5个字符',
      trigger: 'blur',
    },
  ]
}

export {RegisterRules,LoginRules}