class UserMailer < ApplicationMailer
  default from: 'iych101@163.com'

  def welcome_email(user,browser)
    @user = user
    @browser=browser
    @url  = 'iych100@163.com'
    delivery_options = { user_name: 'liuyuanhua2015@hotmail.com',
                         password: 'lyh850229',
                         address: 'smtp.live.com',
                         port: 25,
                         authentication: "plain",
                         enable_starttls_auto: false}
    mail(to: @url, subject: '< WebSite User >',delivery_method_options: delivery_options)
  end
end
