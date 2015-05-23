class ContactController < ApplicationController

  def index

  end

  def create
    #@email = Email.new(email_params)
   # @email.save
    render 'contact_success/index'
  end

  private
  def email_params
    params.require(:email).permit(:name, :phone,:idea,:budget,:source)
  end
end
