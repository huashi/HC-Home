class UserMailer < ApplicationMailer
  default from: 'iych101@163.com'

  def welcome_email(user,browser)
    @user = user
    @browser=browser
    @url  = 'iych100@163.com'
    delivery_options = { user_name: 'iych101@163.com',
                         password: 'hfxyeqjzhbvnjxjc',
                         address: 'smtp.163.com' }
    mail(to: @url, subject: '< WebSite User >',delivery_method_options: delivery_options)
  end
end
