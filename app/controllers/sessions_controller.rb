class SessionsController < ApplicationController

  # skip_before_action :ensure_user_is_logged_in, only: [:new, :create]
  # before_action :ensure_user_is_logged_out, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login_user!(@user)
      flash[:messages] = ["Welcome back to TrollEverywhere, #{@user.username}!"]
      redirect_to root_url
    else
      @user = User.new(user_params)
      flash[:errors] = ["Invalid credentials"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end
end
