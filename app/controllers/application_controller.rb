class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # before_action :ensure_user_is_logged_in

  helper_method :current_user
  helper_method :user_is_logged_in?, :user_is_logged_out?,

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def user_is_logged_in?
    !!current_user
  end

  def user_is_logged_out?
    !current_user
  end

    private
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end

    def ensure_user_is_logged_in
      unless user_is_logged_in?
        flash[:errors] = ["You must log in to view that page."]
        redirect_to new_session_url
      end
    end

    def ensure_user_is_logged_out
      if user_is_logged_in?
        flash[:messages] = ["You are already logged in as #{current_user}."]
        redirect_to root_url
      end
    end
end
