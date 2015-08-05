class ContactController < ApplicationController

  def index

  end

  def create
    @email = Email.new(email_params)
   # @email.save
    @browser=request.env['HTTP_USER_AGENT']
    UserMailer.welcome_email(@email,@browser).deliver
    render 'contact_success/index'
  end

  private
  def email_params
    params.require(:email).permit(:name, :phone,:idea,:budget,:source)
  end
end
