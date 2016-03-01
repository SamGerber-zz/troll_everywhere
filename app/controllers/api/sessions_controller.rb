class Api::SessionsController < ApplicationController

    # skip_before_action :ensure_user_is_logged_in, only: [:new, :create]
    # before_action :ensure_user_is_logged_out, only: [:new, :create]

    def new
      @user = User.new
      render :new
    end

    def show
      @user = current_user
      if @user
        render :show
      else
        render json: { errors: ["Not Logged In"] }, status: 200
      end
    end

    def create
      @user = User.find_by_credentials(user_params)
      if @user
        login_user!(@user)
        render :show
      else
        render json: { errors: ["Invalid credentials"] }, status: 200
      end
    end

    def destroy
      logout!
      render json: { message: ["User logged out"]}, status: 200
    end

end
